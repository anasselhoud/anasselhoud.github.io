import { describe, expect, it, vi } from 'vitest';
import {
  acceptanceProbability,
  computeError,
  coolingTemperature,
  createRandomGenome,
  createRandomTriangle,
  maxPossibleError,
  mutateGenome,
  renderGenome,
  renderGenomeScaled,
} from '../triangleEvolution';

describe('createRandomTriangle', () => {
  it('keeps every point within bounds', () => {
    const triangle = createRandomTriangle(100, 80);

    for (const point of triangle.points) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThan(100);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThan(80);
    }
  });

  it('keeps color channels in range', () => {
    const { color } = createRandomTriangle(100, 100);

    expect(color.r).toBeGreaterThanOrEqual(0);
    expect(color.r).toBeLessThan(256);
    expect(color.g).toBeGreaterThanOrEqual(0);
    expect(color.g).toBeLessThan(256);
    expect(color.b).toBeGreaterThanOrEqual(0);
    expect(color.b).toBeLessThan(256);
    expect(color.a).toBeGreaterThanOrEqual(0.2);
    expect(color.a).toBeLessThanOrEqual(0.6);
  });
});

describe('createRandomGenome', () => {
  it('creates exactly `count` triangles', () => {
    expect(createRandomGenome(37, 100, 100)).toHaveLength(37);
  });
});

describe('mutateGenome', () => {
  it('does not mutate the input genome', () => {
    const genome = createRandomGenome(10, 100, 100);
    const snapshot = JSON.parse(JSON.stringify(genome));

    mutateGenome(genome, 100, 100);

    expect(genome).toEqual(snapshot);
  });

  it('returns a genome of the same length', () => {
    const genome = createRandomGenome(10, 100, 100);
    expect(mutateGenome(genome, 100, 100)).toHaveLength(10);
  });

  it('changes exactly one triangle', () => {
    const genome = createRandomGenome(10, 100, 100);
    const mutated = mutateGenome(genome, 100, 100);

    const changedCount = genome.filter(
      (triangle, i) => JSON.stringify(triangle) !== JSON.stringify(mutated[i]),
    ).length;

    expect(changedCount).toBe(1);
  });

  it('keeps mutated points within bounds', () => {
    // Run several times since mutation picks a random triangle/axis.
    for (let i = 0; i < 20; i++) {
      const genome = createRandomGenome(5, 50, 40);
      const mutated = mutateGenome(genome, 50, 40);

      for (const triangle of mutated) {
        for (const point of triangle.points) {
          expect(point.x).toBeGreaterThanOrEqual(0);
          expect(point.x).toBeLessThanOrEqual(50);
          expect(point.y).toBeGreaterThanOrEqual(0);
          expect(point.y).toBeLessThanOrEqual(40);
        }
      }
    }
  });
});

describe('renderGenome', () => {
  it('fills the background then draws one triangle per genome entry', () => {
    const genome = createRandomGenome(3, 10, 10);
    const ctx = {
      fillStyle: '',
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    renderGenome(ctx, genome, 10, 10);

    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 10, 10);
    expect(ctx.beginPath).toHaveBeenCalledTimes(3);
    expect(ctx.fill).toHaveBeenCalledTimes(3);
  });
});

describe('renderGenomeScaled', () => {
  it('scales the context so a small genome fills a larger canvas', () => {
    const genome = createRandomGenome(3, 100, 100);
    const ctx = {
      fillStyle: '',
      save: vi.fn(),
      scale: vi.fn(),
      restore: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    renderGenomeScaled(ctx, genome, 100, 100, 640, 320);

    // Scaled 6.4x horizontally and 3.2x vertically to stretch the 100x100
    // scoring space to fill a 640x320 display canvas.
    expect(ctx.save).toHaveBeenCalledTimes(1);
    expect(ctx.scale).toHaveBeenCalledWith(6.4, 3.2);
    expect(ctx.restore).toHaveBeenCalledTimes(1);
    // The background fill is still issued in source-space coordinates —
    // it is the earlier `scale` call that stretches it to cover the canvas.
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100);
    expect(ctx.beginPath).toHaveBeenCalledTimes(3);
  });

  it('restores the context even with an empty genome', () => {
    const ctx = {
      fillStyle: '',
      save: vi.fn(),
      scale: vi.fn(),
      restore: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    renderGenomeScaled(ctx, [], 50, 50, 200, 200);

    expect(ctx.save).toHaveBeenCalledTimes(1);
    expect(ctx.restore).toHaveBeenCalledTimes(1);
  });
});

describe('computeError', () => {
  it('is zero for identical images', () => {
    const data = new Uint8ClampedArray([10, 20, 30, 255, 40, 50, 60, 255]);
    const a = { data, width: 2, height: 1 } as ImageData;
    const b = { data: data.slice(), width: 2, height: 1 } as ImageData;

    expect(computeError(a, b)).toBe(0);
  });

  it('grows with the difference between images', () => {
    const a = {
      data: new Uint8ClampedArray([0, 0, 0, 255]),
      width: 1,
      height: 1,
    } as ImageData;
    const bClose = {
      data: new Uint8ClampedArray([10, 0, 0, 255]),
      width: 1,
      height: 1,
    } as ImageData;
    const bFar = {
      data: new Uint8ClampedArray([255, 255, 255, 255]),
      width: 1,
      height: 1,
    } as ImageData;

    expect(computeError(a, bClose)).toBeGreaterThan(0);
    expect(computeError(a, bFar)).toBeGreaterThan(computeError(a, bClose));
  });

  it('ignores the alpha channel', () => {
    const a = {
      data: new Uint8ClampedArray([10, 20, 30, 0]),
      width: 1,
      height: 1,
    } as ImageData;
    const b = {
      data: new Uint8ClampedArray([10, 20, 30, 255]),
      width: 1,
      height: 1,
    } as ImageData;

    expect(computeError(a, b)).toBe(0);
  });
});

describe('maxPossibleError', () => {
  it('scales with pixel count', () => {
    expect(maxPossibleError(100)).toBe(100 * 3 * 255 * 255);
  });
});

describe('acceptanceProbability', () => {
  it('always accepts an improving move', () => {
    expect(acceptanceProbability(100, 50, 10)).toBe(1);
  });

  it('never accepts a worsening move at zero temperature', () => {
    expect(acceptanceProbability(50, 100, 0)).toBe(0);
  });

  it('accepts worsening moves less often as temperature drops', () => {
    const hot = acceptanceProbability(50, 100, 100);
    const cold = acceptanceProbability(50, 100, 1);

    expect(hot).toBeGreaterThan(cold);
    expect(hot).toBeLessThanOrEqual(1);
    expect(cold).toBeGreaterThan(0);
  });
});

describe('coolingTemperature', () => {
  it('starts at the initial temperature', () => {
    expect(coolingTemperature(1000, 0, 0.01)).toBe(1000);
  });

  it('decreases monotonically with iteration count', () => {
    const early = coolingTemperature(1000, 10, 0.01);
    const late = coolingTemperature(1000, 100, 0.01);

    expect(late).toBeLessThan(early);
    expect(early).toBeLessThan(1000);
  });
});
