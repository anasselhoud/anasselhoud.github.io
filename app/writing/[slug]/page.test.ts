import { describe, expect, it, vi } from 'vitest';

import { SITE_URL } from '@/lib/utils';

// Metadata-shape behavior should not depend on whatever happens to be
// published in content/writing/ at any given time — that coupling is what
// broke this suite the last time a post was removed. Fixture posts decouple
// it; the image fixture points at a real, always-present public asset so
// `readImageSize` still exercises a real file read.
vi.mock('@/lib/posts', () => ({
  getPostBySlug: (slug: string) => {
    const posts: Record<
      string,
      {
        slug: string;
        title: string;
        date: string;
        description: string;
        content: string;
        image?: string;
        imageAlt?: string;
      }
    > = {
      'fixture-post': {
        slug: 'fixture-post',
        title: 'Fixture Post',
        date: '2026-01-01',
        description: 'A fixture post for metadata tests.',
        content: 'Fixture body.',
      },
      'fixture-post-with-image': {
        slug: 'fixture-post-with-image',
        title: 'Fixture Post With Image',
        date: '2026-01-01',
        description: 'A fixture post with an explicit article image.',
        content: 'Fixture body.',
        image: '/images/anass.jpg',
        imageAlt: 'A fixture alt text',
      },
    };

    return posts[slug] ?? null;
  },
}));

import { generateMetadata } from './page';

describe('writing post metadata', () => {
  it('uses a trailing-slash canonical URL for posts', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'fixture-post' }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/fixture-post/`);
  });

  it('uses an explicitly selected article image for social metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'fixture-post-with-image' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/images/anass.jpg`,
        width: 417,
        height: 420,
        alt: 'A fixture alt text',
      },
    ]);
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });
});
