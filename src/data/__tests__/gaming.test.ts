import { describe, expect, it } from 'vitest';

import { featuredGames, walkthroughs } from '../gaming';

const VALID_PLATFORMS = ['pc', 'playstation'];

describe('gaming data — featured games', () => {
  it('exports an array of featured games', () => {
    expect(Array.isArray(featuredGames)).toBe(true);
    expect(featuredGames.length).toBeGreaterThan(0);
  });

  it('each featured game has required properties', () => {
    for (const game of featuredGames) {
      expect(typeof game.title).toBe('string');
      expect(typeof game.description).toBe('string');
      expect(VALID_PLATFORMS).toContain(game.platform);
      expect(typeof game.hours).toBe('number');
      expect(['Perfect', 'Great']).toContain(game.badge);
      expect(typeof game.genre).toBe('string');
      expect(typeof game.progression).toBe('number');
    }
  });

  it('titles and descriptions are non-empty', () => {
    for (const game of featuredGames) {
      expect(game.title.trim().length).toBeGreaterThan(0);
      expect(game.description.trim().length).toBeGreaterThan(0);
    }
  });

  it('image paths start with / when present', () => {
    for (const game of featuredGames) {
      if (game.image) {
        expect(game.image.startsWith('/')).toBe(true);
      }
    }
  });

  it('progression is a percentage between 0 and 100', () => {
    for (const game of featuredGames) {
      expect(game.progression).toBeGreaterThanOrEqual(0);
      expect(game.progression).toBeLessThanOrEqual(100);
    }
  });

  it('has unique titles', () => {
    const titles = featuredGames.map((g) => g.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe('gaming data — walkthroughs', () => {
  it('exports an array of year groups', () => {
    expect(Array.isArray(walkthroughs)).toBe(true);
    expect(walkthroughs.length).toBeGreaterThan(0);
  });

  it('each year group has a year and a non-empty games list', () => {
    for (const group of walkthroughs) {
      expect(typeof group.year).toBe('number');
      expect(Array.isArray(group.games)).toBe(true);
      expect(group.games.length).toBeGreaterThan(0);
    }
  });

  it('each played game has required properties', () => {
    for (const group of walkthroughs) {
      for (const game of group.games) {
        expect(game.title.trim().length).toBeGreaterThan(0);
        expect(game.genre.trim().length).toBeGreaterThan(0);
        expect(VALID_PLATFORMS).toContain(game.platform);
        expect(typeof game.rating).toBe('number');
        expect(game.rating).toBeGreaterThanOrEqual(0);
        expect(game.rating).toBeLessThanOrEqual(5);

        if (game.hours !== undefined) {
          expect(typeof game.hours).toBe('string');
        }
      }
    }
  });

  it('has unique years', () => {
    const years = walkthroughs.map((g) => g.year);
    expect(new Set(years).size).toBe(years.length);
  });

  it('years are sorted newest first', () => {
    const years = walkthroughs.map((g) => g.year);
    const sorted = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sorted);
  });
});
