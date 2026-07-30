import { describe, expect, it } from 'vitest';

import thesis from '../phd-thesis';

describe('phd-thesis data', () => {
  it('has the core required fields, non-empty', () => {
    expect(thesis.title.trim().length).toBeGreaterThan(0);
    expect(thesis.author.trim().length).toBeGreaterThan(0);
    expect(thesis.program.trim().length).toBeGreaterThan(0);
    expect(thesis.defenseDate.trim().length).toBeGreaterThan(0);
  });

  it('image paths start with /', () => {
    expect(thesis.coverImage.startsWith('/')).toBe(true);
    expect(thesis.partnerLogos.startsWith('/')).toBe(true);
  });

  it('has a non-empty abstract made of non-empty paragraphs', () => {
    expect(Array.isArray(thesis.abstract)).toBe(true);
    expect(thesis.abstract.length).toBeGreaterThan(0);

    for (const paragraph of thesis.abstract) {
      expect(paragraph.trim().length).toBeGreaterThan(0);
    }
  });

  it('has at least one jury member with required properties', () => {
    expect(Array.isArray(thesis.jury)).toBe(true);
    expect(thesis.jury.length).toBeGreaterThan(0);

    for (const member of thesis.jury) {
      expect(member.name.trim().length).toBeGreaterThan(0);
      expect(member.role.trim().length).toBeGreaterThan(0);
      expect(member.institution.trim().length).toBeGreaterThan(0);
      expect(member.position.trim().length).toBeGreaterThan(0);
    }
  });

  it('jury links are valid URLs when present', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const member of thesis.jury) {
      if (member.link !== undefined) {
        expect(member.link).toMatch(urlRegex);
      }
    }
  });

  it('has unique jury member names', () => {
    const names = thesis.jury.map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('all four action links are present as strings', () => {
    expect(typeof thesis.links.read).toBe('string');
    expect(typeof thesis.links.download).toBe('string');
    expect(typeof thesis.links.cite).toBe('string');
    expect(typeof thesis.links.defenseReplay).toBe('string');
  });
});
