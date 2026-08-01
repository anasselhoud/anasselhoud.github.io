import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  default: () => false,
}));

import LabPage from '../lab/page';

describe('lab page', () => {
  it('renders the home-lab cards', () => {
    render(<LabPage />);

    for (const title of [
      'Raspberry Pi builds',
      'Home-lab networking',
      'Open-source AI experiments',
      'Quantum programming',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
  });

  it('mounts the triangle-evolution experiment', () => {
    render(<LabPage />);

    expect(
      screen.getByRole('heading', { name: /portrait in 150 triangles/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('links out to the essay the experiment illustrates', () => {
    render(<LabPage />);

    expect(screen.getByRole('link', { name: 'this essay' })).toHaveAttribute(
      'href',
      '/writing/why-i-mostly-switched-from-claude-code-to-codex-desktop-app',
    );
  });
});
