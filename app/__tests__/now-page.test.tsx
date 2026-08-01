import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';
import NowPage from '../now/page';

describe('now page', () => {
  it('renders every status section as a heading', () => {
    render(<NowPage />);

    for (const label of [
      'Working on',
      'Building',
      'Writing',
      'Reading',
      'Based in',
    ]) {
      expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    }
  });

  it('reflects the real current-city fact rather than a hardcoded one', () => {
    render(<NowPage />);

    expect(
      screen.getByText(new RegExp(profile.currentCity)),
    ).toBeInTheDocument();
  });

  it('links to the published essay and the lab experiment', () => {
    render(<NowPage />);
    const article = screen.getByRole('article');

    expect(
      within(article).getByRole('link', {
        name: 'Why Trade-offs Are Steering Industrial AI',
      }),
    ).toHaveAttribute(
      'href',
      '/writing/why-i-mostly-switched-from-claude-code-to-codex-desktop-app',
    );
    expect(within(article).getByRole('link', { name: 'Lab' })).toHaveAttribute(
      'href',
      '/lab',
    );
  });
});
