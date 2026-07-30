import { describe, expect, it, vi } from 'vitest';

// The post-route assertions below should not depend on whether
// content/writing/ has any published posts at any given time — a fixture
// post decouples them from real editorial content.
vi.mock('@/lib/posts', () => ({
  getAllPosts: () => [
    {
      slug: 'fixture-post',
      title: 'Fixture Post',
      date: '2026-01-01',
      description: 'A fixture post used to test sitemap generation.',
    },
  ],
}));

import { SITE_URL } from '@/lib/utils';
import sitemap from '../sitemap';

describe('sitemap', () => {
  it('uses trailing slashes for exported page routes', () => {
    const entries = sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: `${SITE_URL}/` }),
        expect.objectContaining({ url: `${SITE_URL}/about/` }),
        expect.objectContaining({ url: `${SITE_URL}/resume/` }),
        expect.objectContaining({ url: `${SITE_URL}/projects/` }),
        expect.objectContaining({ url: `${SITE_URL}/writing/` }),
        expect.objectContaining({ url: `${SITE_URL}/stats/` }),
        expect.objectContaining({ url: `${SITE_URL}/contact/` }),
        expect.objectContaining({ url: `${SITE_URL}/phd-thesis/` }),
        expect.objectContaining({ url: `${SITE_URL}/books/` }),
        expect.objectContaining({ url: `${SITE_URL}/astrophotography/` }),
        expect.objectContaining({ url: `${SITE_URL}/gaming/` }),
        expect.objectContaining({ url: `${SITE_URL}/talks/` }),
      ]),
    );
  });

  it('does not invent modification dates for static pages', () => {
    const staticEntries = sitemap().filter(
      (entry) => !entry.url.startsWith(`${SITE_URL}/writing/`),
    );

    expect(
      staticEntries.every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });

  it('uses trailing slashes for post routes', () => {
    const entries = sitemap();
    const postEntries = entries.filter(
      (entry) =>
        entry.url.startsWith(`${SITE_URL}/writing/`) &&
        entry.url !== `${SITE_URL}/writing/`,
    );

    expect(postEntries.length).toBeGreaterThan(0);
    expect(postEntries.every((entry) => entry.url.endsWith('/'))).toBe(true);
  });
});
