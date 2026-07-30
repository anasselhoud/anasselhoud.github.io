import { describe, expect, it } from 'vitest';

import talks from '../talks';

describe('talks data', () => {
  it('exports an array of talks', () => {
    expect(Array.isArray(talks)).toBe(true);
    expect(talks.length).toBeGreaterThan(0);
  });

  it('each talk has required properties', () => {
    for (const talk of talks) {
      expect(talk.title.trim().length).toBeGreaterThan(0);
      expect(talk.type.trim().length).toBeGreaterThan(0);
      expect(talk.event.trim().length).toBeGreaterThan(0);
      expect(talk.location.trim().length).toBeGreaterThan(0);
      expect(talk.dateLabel.trim().length).toBeGreaterThan(0);
      expect(['talk', 'workshop']).toContain(talk.category);
    }
  });

  it('dates are valid date strings', () => {
    for (const talk of talks) {
      const date = new Date(talk.date);
      expect(date.toString()).not.toBe('Invalid Date');
    }
  });

  it('has unique titles', () => {
    const titles = talks.map((t) => t.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('is sorted newest first within each category', () => {
    for (const category of ['talk', 'workshop'] as const) {
      const dates = talks
        .filter((t) => t.category === category)
        .map((t) => t.date);
      const sorted = [...dates].sort((a, b) => b.localeCompare(a));

      expect(dates).toEqual(sorted);
    }
  });
});
