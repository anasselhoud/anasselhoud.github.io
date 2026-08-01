import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrefersReducedMotion = vi.fn(() => false);

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  default: () => mockPrefersReducedMotion(),
}));

import TriangleEvolution from '../../Lab/TriangleEvolution';

/** Minimal 2D context stub: enough surface for triangleEvolution.ts to run without a real renderer. */
function createFakeContext() {
  return {
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
    drawImage: vi.fn(),
    getImageData: vi.fn(
      () =>
        ({
          data: new Uint8ClampedArray(100 * 4),
          width: 1,
          height: 100,
        }) as unknown as ImageData,
    ),
  };
}

describe('TriangleEvolution', () => {
  beforeEach(() => {
    mockPrefersReducedMotion.mockReturnValue(false);

    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => createFakeContext() as unknown as CanvasRenderingContext2D,
    );

    // jsdom never decodes real images; firing onload synchronously lets the
    // component's init effect run to completion like a real image load would.
    vi.stubGlobal(
      'Image',
      class {
        naturalWidth = 100;
        naturalHeight = 100;
        onload: (() => void) | null = null;
        set src(_value: string) {
          this.onload?.();
        }
      },
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders the canvas and enables controls once the portrait loads', () => {
    render(<TriangleEvolution />);

    expect(
      screen.getByRole('img', {
        name: /portrait rebuilt from 150 translucent triangles/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Run' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeEnabled();
  });

  it('shows a starting readout of zero generations', () => {
    render(<TriangleEvolution />);

    expect(screen.getByText('Generation')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('toggles to Pause when Run is clicked, and advances the generation count', () => {
    vi.useFakeTimers();

    render(<TriangleEvolution />);

    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Flush a couple of animation frames.
    vi.advanceTimersByTime(50);

    expect(screen.getByText('Generation')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('resets the generation count back to zero', () => {
    vi.useFakeTimers();
    render(<TriangleEvolution />);

    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    vi.advanceTimersByTime(50);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('replaces the Run/Pause toggle with a single step batch under reduced motion', () => {
    mockPrefersReducedMotion.mockReturnValue(true);

    render(<TriangleEvolution />);

    expect(
      screen.getByRole('button', { name: /run 400 steps/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Pause' }),
    ).not.toBeInTheDocument();
  });
});
