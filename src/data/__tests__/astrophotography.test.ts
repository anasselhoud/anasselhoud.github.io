import { describe, expect, it } from 'vitest';

import photos from '../astrophotography';

describe('astrophotography data', () => {
  it('exports an array of photos', () => {
    expect(Array.isArray(photos)).toBe(true);
    expect(photos.length).toBeGreaterThan(0);
  });

  it('each photo has required properties', () => {
    for (const photo of photos) {
      expect(typeof photo.slug).toBe('string');
      expect(photo.slug.trim().length).toBeGreaterThan(0);
      expect(typeof photo.thumb).toBe('string');
      expect(typeof photo.full).toBe('string');
    }
  });

  it('thumb and full image paths start with /', () => {
    for (const photo of photos) {
      expect(photo.thumb.startsWith('/')).toBe(true);
      expect(photo.full.startsWith('/')).toBe(true);
    }
  });

  it('caption and location are non-empty strings when present', () => {
    for (const photo of photos) {
      if (photo.caption !== undefined) {
        expect(photo.caption.trim().length).toBeGreaterThan(0);
      }
      if (photo.location !== undefined) {
        expect(photo.location.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('has unique slugs', () => {
    const slugs = photos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has unique thumb and full paths', () => {
    const thumbs = photos.map((p) => p.thumb);
    const fulls = photos.map((p) => p.full);
    expect(new Set(thumbs).size).toBe(thumbs.length);
    expect(new Set(fulls).size).toBe(fulls.length);
  });
});
