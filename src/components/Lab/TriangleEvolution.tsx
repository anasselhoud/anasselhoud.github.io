'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import {
  acceptanceProbability,
  computeError,
  coolingTemperature,
  createRandomGenome,
  type Genome,
  maxPossibleError,
  mutateGenome,
  renderGenome,
  renderGenomeScaled,
} from '@/lib/triangleEvolution';
import { SITE_IMAGE_PATH } from '@/lib/utils';

const TRIANGLE_COUNT = 150;
const WORK_WIDTH = 100;
const DISPLAY_WIDTH = 512;
const MUTATIONS_PER_TICK = 5;
const REDUCED_MOTION_STEP_BATCH = 400;
const INITIAL_TEMPERATURE = 6000;
const COOLING_RATE = 0.001;

interface EngineState {
  genome: Genome;
  error: number;
  iteration: number;
}

function formatMatch(error: number, maxError: number): string {
  const match = 100 - (error / maxError) * 100;
  return `${Math.max(0, match).toFixed(1)}%`;
}

export default function TriangleEvolution() {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const workCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetImageDataRef = useRef<ImageData | null>(null);
  const workHeightRef = useRef(WORK_WIDTH);
  const engineRef = useRef<EngineState | null>(null);
  const rafRef = useRef<number | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [matchLabel, setMatchLabel] = useState('0.0%');

  // Loads the portrait once, draws it into a small offscreen canvas, and
  // keeps the resulting pixels around as the target every candidate genome
  // is scored against. Also seeds the first random genome, sized to match
  // the portrait's real aspect ratio rather than assuming it's square.
  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      const workHeight = Math.round(
        (WORK_WIDTH * image.naturalHeight) / image.naturalWidth,
      );
      workHeightRef.current = workHeight;

      const workCanvas = workCanvasRef.current;
      if (!workCanvas) return;
      workCanvas.width = WORK_WIDTH;
      workCanvas.height = workHeight;
      const workCtx = workCanvas.getContext('2d');
      if (!workCtx) return;

      workCtx.drawImage(image, 0, 0, WORK_WIDTH, workHeight);
      targetImageDataRef.current = workCtx.getImageData(
        0,
        0,
        WORK_WIDTH,
        workHeight,
      );

      const genome = createRandomGenome(TRIANGLE_COUNT, WORK_WIDTH, workHeight);
      renderGenome(workCtx, genome, WORK_WIDTH, workHeight);
      const error = computeError(
        workCtx.getImageData(0, 0, WORK_WIDTH, workHeight),
        targetImageDataRef.current,
      );
      engineRef.current = { genome, error, iteration: 0 };

      const displayCanvas = displayCanvasRef.current;
      const displayHeight = Math.round(
        (DISPLAY_WIDTH * workHeight) / WORK_WIDTH,
      );
      if (displayCanvas) {
        displayCanvas.width = DISPLAY_WIDTH;
        displayCanvas.height = displayHeight;
        const displayCtx = displayCanvas.getContext('2d');
        if (displayCtx) {
          renderGenomeScaled(
            displayCtx,
            genome,
            WORK_WIDTH,
            workHeight,
            DISPLAY_WIDTH,
            displayHeight,
          );
        }
      }

      setMatchLabel(
        formatMatch(error, maxPossibleError(WORK_WIDTH * workHeight)),
      );
      setReady(true);
    };
    image.src = SITE_IMAGE_PATH;

    return () => {
      image.onload = null;
    };
  }, []);

  const step = useCallback(() => {
    const engine = engineRef.current;
    const target = targetImageDataRef.current;
    const workCanvas = workCanvasRef.current;
    const workCtx = workCanvas?.getContext('2d');
    if (!engine || !target || !workCanvas || !workCtx) return;

    const workHeight = workHeightRef.current;
    let { genome, error, iteration } = engine;

    for (let i = 0; i < MUTATIONS_PER_TICK; i++) {
      const candidate = mutateGenome(genome, WORK_WIDTH, workHeight);
      renderGenome(workCtx, candidate, WORK_WIDTH, workHeight);
      const candidateError = computeError(
        workCtx.getImageData(0, 0, WORK_WIDTH, workHeight),
        target,
      );
      const temperature = coolingTemperature(
        INITIAL_TEMPERATURE,
        iteration,
        COOLING_RATE,
      );

      if (
        Math.random() <
        acceptanceProbability(error, candidateError, temperature)
      ) {
        genome = candidate;
        error = candidateError;
      }
      iteration += 1;
    }

    engineRef.current = { genome, error, iteration };

    const displayCanvas = displayCanvasRef.current;
    const displayCtx = displayCanvas?.getContext('2d');
    if (displayCanvas && displayCtx) {
      renderGenomeScaled(
        displayCtx,
        genome,
        WORK_WIDTH,
        workHeight,
        displayCanvas.width,
        displayCanvas.height,
      );
    }

    setIteration(iteration);
    setMatchLabel(
      formatMatch(error, maxPossibleError(WORK_WIDTH * workHeight)),
    );
  }, []);

  // Continuous mode: a plain rAF loop while `isRunning`, torn down on pause,
  // reduced-motion, or unmount. Reduced-motion never enters this loop at
  // all — see `runSteps` below for the alternative it gets instead.
  useEffect(() => {
    if (!isRunning || prefersReducedMotion) return;

    let cancelled = false;

    const loop = () => {
      if (cancelled) return;
      step();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, prefersReducedMotion, step]);

  // Under reduced motion there is no continuous animation: one click runs a
  // fixed batch synchronously (chunked across a few frames so the tab does
  // not lock up) and then stops, the same "single reading" shape the rest
  // of the site uses for a reduced-motion preference.
  const runSteps = useCallback(() => {
    let remaining = REDUCED_MOTION_STEP_BATCH;

    const chunk = () => {
      const batch = Math.min(MUTATIONS_PER_TICK * 4, remaining);
      for (let i = 0; i < batch / MUTATIONS_PER_TICK; i++) step();
      remaining -= batch;
      if (remaining > 0) requestAnimationFrame(chunk);
    };

    chunk();
  }, [step]);

  const handleReset = useCallback(() => {
    const workHeight = workHeightRef.current;
    const target = targetImageDataRef.current;
    const workCanvas = workCanvasRef.current;
    const workCtx = workCanvas?.getContext('2d');
    if (!target || !workCanvas || !workCtx) return;

    const genome = createRandomGenome(TRIANGLE_COUNT, WORK_WIDTH, workHeight);
    renderGenome(workCtx, genome, WORK_WIDTH, workHeight);
    const error = computeError(
      workCtx.getImageData(0, 0, WORK_WIDTH, workHeight),
      target,
    );
    engineRef.current = { genome, error, iteration: 0 };

    const displayCanvas = displayCanvasRef.current;
    const displayCtx = displayCanvas?.getContext('2d');
    if (displayCanvas && displayCtx) {
      renderGenomeScaled(
        displayCtx,
        genome,
        WORK_WIDTH,
        workHeight,
        displayCanvas.width,
        displayCanvas.height,
      );
    }

    setIsRunning(false);
    setIteration(0);
    setMatchLabel(
      formatMatch(error, maxPossibleError(WORK_WIDTH * workHeight)),
    );
  }, []);

  return (
    <div className="triangle-evolution">
      <div className="triangle-evolution-stage">
        <canvas
          ref={displayCanvasRef}
          className="triangle-evolution-canvas"
          role="img"
          aria-label={`A portrait rebuilt from ${TRIANGLE_COUNT} translucent triangles, currently a ${matchLabel} pixel match to the source photo.`}
        />
        <canvas ref={workCanvasRef} hidden aria-hidden="true" />
      </div>

      <div className="triangle-evolution-controls">
        {prefersReducedMotion ? (
          <button
            type="button"
            className="button"
            onClick={runSteps}
            disabled={!ready}
          >
            Run {REDUCED_MOTION_STEP_BATCH} steps
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setIsRunning((running) => !running)}
            disabled={!ready}
            aria-pressed={isRunning}
          >
            {isRunning ? 'Pause' : 'Run'}
          </button>
        )}
        <button
          type="button"
          className="button button-secondary"
          onClick={handleReset}
          disabled={!ready}
        >
          Reset
        </button>

        <dl className="triangle-evolution-readout">
          <div>
            <dt>Generation</dt>
            <dd>{iteration.toLocaleString('en-US')}</dd>
          </div>
          <div>
            <dt>Match</dt>
            <dd>{matchLabel}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
