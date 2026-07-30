import { describe, expect, it, vi } from 'vitest';

import { SITE_URL } from '@/lib/utils';

// Route-formatting behavior (trailing slashes, self-link shape, build-date
// derivation) should not depend on whatever happens to be published in
// content/writing/ at any given time — that coupling is what broke this
// suite the last time a post was removed. A fixture post decouples it.
vi.mock('@/lib/posts', () => ({
  getAllPosts: () => [
    {
      slug: 'fixture-post',
      title: 'Fixture Post',
      date: '2026-03-10',
      description: 'A fixture post used to test feed formatting.',
    },
  ],
}));

import { GET } from '../route';

describe('feed.xml route', () => {
  it('uses canonical trailing-slash links for writing pages', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/writing/`);
    expect(xml).toContain(`${SITE_URL}/writing/fixture-post/`);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });

  it('derives lastBuildDate from content rather than the build clock', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(
      '<lastBuildDate>Tue, 10 Mar 2026 12:00:00 GMT</lastBuildDate>',
    );
  });
});
