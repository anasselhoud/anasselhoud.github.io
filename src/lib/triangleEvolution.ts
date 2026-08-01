/**
 * Simulated annealing over a population of translucent triangles, evolving
 * toward a target image — a live version of the triangle-Mona-Lisa example
 * in /writing/why-i-mostly-switched-from-claude-code-to-codex-desktop-app.
 *
 * Pure and DOM-free except for `renderGenome`, which needs a 2D context to
 * draw into. Everything else operates on plain arrays so the annealing
 * schedule and mutation logic can be unit tested without a canvas.
 */

export interface Point {
  x: number;
  y: number;
}

export interface Triangle {
  points: [Point, Point, Point];
  /** 0–255 RGB, 0–1 alpha. */
  color: { r: number; g: number; b: number; a: number };
}

export type Genome = Triangle[];

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function createRandomTriangle(width: number, height: number): Triangle {
  return {
    points: [
      { x: randomInt(width), y: randomInt(height) },
      { x: randomInt(width), y: randomInt(height) },
      { x: randomInt(width), y: randomInt(height) },
    ],
    color: {
      r: randomInt(256),
      g: randomInt(256),
      b: randomInt(256),
      a: 0.2 + Math.random() * 0.4,
    },
  };
}

export function createRandomGenome(
  count: number,
  width: number,
  height: number,
): Genome {
  return Array.from({ length: count }, () =>
    createRandomTriangle(width, height),
  );
}

/**
 * Returns a new genome with exactly one triangle nudged — either a vertex
 * moved a short distance, or a colour channel perturbed. Never mutates the
 * input, so the caller can cheaply keep the previous genome around to
 * revert to when a mutation is rejected.
 */
export function mutateGenome(
  genome: Genome,
  width: number,
  height: number,
): Genome {
  const index = randomInt(genome.length);
  const target = genome[index];
  const jitter = Math.max(width, height) * 0.08;

  const next: Triangle =
    Math.random() < 0.5
      ? {
          ...target,
          points: target.points.map((point, i) =>
            i === randomInt(3)
              ? {
                  x: clamp(
                    point.x + (Math.random() - 0.5) * jitter * 2,
                    0,
                    width,
                  ),
                  y: clamp(
                    point.y + (Math.random() - 0.5) * jitter * 2,
                    0,
                    height,
                  ),
                }
              : point,
          ) as [Point, Point, Point],
        }
      : {
          ...target,
          color: { ...target.color },
        };

  if (Math.random() >= 0.5) {
    const channel = (['r', 'g', 'b'] as const)[randomInt(3)];
    next.color = {
      ...next.color,
      [channel]: clamp(
        next.color[channel] + (Math.random() - 0.5) * 60,
        0,
        255,
      ),
    };
  }

  const mutated = [...genome];
  mutated[index] = next;
  return mutated;
}

export function renderGenome(
  ctx: CanvasRenderingContext2D,
  genome: Genome,
  width: number,
  height: number,
): void {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  for (const triangle of genome) {
    const { points, color } = triangle;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Draws a genome whose triangle coordinates live in a small scoring
 * resolution onto a canvas of a different (typically larger) pixel size.
 *
 * `renderGenome` draws triangle points as literal pixel coordinates, so
 * calling it directly against a display canvas sized differently from the
 * genome's own working resolution only ever fills a corner of it — the
 * background fill covers the full canvas, but the triangles, still bounded
 * to the small coordinate space, do not. Scaling the context first keeps
 * `renderGenome` itself resolution-agnostic.
 */
export function renderGenomeScaled(
  ctx: CanvasRenderingContext2D,
  genome: Genome,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): void {
  ctx.save();
  ctx.scale(targetWidth / sourceWidth, targetHeight / sourceHeight);
  renderGenome(ctx, genome, sourceWidth, sourceHeight);
  ctx.restore();
}

/** Sum of squared per-channel differences. Lower is a closer match. */
export function computeError(a: ImageData, b: ImageData): number {
  let error = 0;
  const dataA = a.data;
  const dataB = b.data;

  for (let i = 0; i < dataA.length; i += 4) {
    const dr = dataA[i] - dataB[i];
    const dg = dataA[i + 1] - dataB[i + 1];
    const db = dataA[i + 2] - dataB[i + 2];
    error += dr * dr + dg * dg + db * db;
  }

  return error;
}

/** The worst possible error for an image of this size — for normalizing a match percentage. */
export function maxPossibleError(pixelCount: number): number {
  return pixelCount * 3 * 255 * 255;
}

/**
 * Metropolis acceptance criterion: always take an improving move, and take a
 * worsening one with probability that shrinks as the temperature cools —
 * "heat metal, cool it slowly, and let the atoms settle" (per the linked
 * essay), rather than plain hill-climbing, which would get stuck on the
 * first locally-good arrangement it finds.
 */
export function acceptanceProbability(
  currentError: number,
  candidateError: number,
  temperature: number,
): number {
  if (candidateError < currentError) return 1;
  if (temperature <= 0) return 0;
  return Math.exp((currentError - candidateError) / temperature);
}

/** Exponential cooling schedule. */
export function coolingTemperature(
  initialTemperature: number,
  iteration: number,
  coolingRate: number,
): number {
  return initialTemperature * (1 - coolingRate) ** iteration;
}
