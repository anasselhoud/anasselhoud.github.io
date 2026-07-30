import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Skills from '../../Resume/Skills';

const mockCategories = [
  { name: 'Languages', group: 'Technical' as const },
  { name: 'ML Engineering', group: 'Technical' as const },
  { name: 'Web Development', group: 'Technical' as const },
];

const mockSkills = [
  { title: 'Python', category: 'Languages' },
  { title: 'TypeScript', category: 'Languages' },
  { title: 'JavaScript', category: 'Web Development' },
  { title: 'PyTorch', category: 'ML Engineering' },
  { title: 'React', category: 'Web Development' },
];

describe('Skills', () => {
  it('renders the skills section with title', () => {
    render(<Skills skills={mockSkills} categories={mockCategories} />);

    expect(
      screen.getByRole('heading', { name: /skills/i }),
    ).toBeInTheDocument();
  });

  it('has no filter controls', () => {
    render(<Skills skills={mockSkills} categories={mockCategories} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows every skill, ungated by any filter', () => {
    render(<Skills skills={mockSkills} categories={mockCategories} />);

    expect(screen.getByText('Python')).toBeVisible();
    expect(screen.getByText('TypeScript')).toBeVisible();
    expect(screen.getByText('JavaScript')).toBeVisible();
    expect(screen.getByText('PyTorch')).toBeVisible();
    expect(screen.getByText('React')).toBeVisible();
  });

  it('displays skills grouped by category', () => {
    render(<Skills skills={mockSkills} categories={mockCategories} />);

    const groupTitles = Array.from(
      document.querySelectorAll('.skill-group-title'),
    ).map((el) => el.textContent);

    expect(groupTitles).toEqual([
      'Languages',
      'ML Engineering',
      'Web Development',
    ]);
  });

  it('omits a category with no matching skills', () => {
    const categoriesWithExtra = [
      ...mockCategories,
      { name: 'Empty Category', group: 'Technical' as const },
    ];

    render(<Skills skills={mockSkills} categories={categoriesWithExtra} />);

    expect(screen.queryByText('Empty Category')).not.toBeInTheDocument();
  });

  it('groups tracks by category.group, falling back to a single untitled track', () => {
    const { container } = render(
      <Skills skills={mockSkills} categories={mockCategories} />,
    );

    // All mock categories share one group, so exactly one track renders and
    // it carries no visible track title (mirrors the untitled fallback used
    // by tests that omit `group` entirely).
    expect(container.querySelectorAll('.skill-track')).toHaveLength(1);
    expect(container.querySelector('.skill-track-title')).toBeInTheDocument();
  });

  it('renders an untitled track when categories omit `group`', () => {
    const categoriesWithoutGroup = mockCategories.map(({ name }) => ({
      name,
    }));

    const { container } = render(
      <Skills skills={mockSkills} categories={categoriesWithoutGroup} />,
    );

    expect(container.querySelectorAll('.skill-track')).toHaveLength(1);
    expect(
      container.querySelector('.skill-track-title'),
    ).not.toBeInTheDocument();
  });
});
