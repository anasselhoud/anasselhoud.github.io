import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import writing from '@/data/writing';
import ResearchPage from '../research/page';

describe('research page', () => {
  it('lists every real publication as an external link', () => {
    render(<ResearchPage />);

    for (const paper of writing) {
      const link = screen.getByRole('link', { name: paper.title });
      expect(link).toHaveAttribute('href', paper.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('orders publications newest first', () => {
    render(<ResearchPage />);

    const years = screen
      .getAllByText(/^\d{4}$/)
      .map((el) => Number(el.textContent));

    const sorted = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sorted);
  });
});
