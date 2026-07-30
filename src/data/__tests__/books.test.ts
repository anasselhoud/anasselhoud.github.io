import { describe, expect, it } from 'vitest';

import books from '../books';

describe('books data', () => {
  it('exports an array of books', () => {
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  it('each book has required properties', () => {
    for (const book of books) {
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
      expect(book).toHaveProperty('category');
      expect(book).toHaveProperty('rating');
      expect(book).toHaveProperty('image');

      expect(typeof book.title).toBe('string');
      expect(typeof book.author).toBe('string');
      expect(typeof book.category).toBe('string');
      expect(typeof book.rating).toBe('number');
      expect(typeof book.image).toBe('string');
    }
  });

  it('titles and authors are non-empty', () => {
    for (const book of books) {
      expect(book.title.trim().length).toBeGreaterThan(0);
      expect(book.author.trim().length).toBeGreaterThan(0);
    }
  });

  it('ratings are between 0 and 5', () => {
    for (const book of books) {
      expect(book.rating).toBeGreaterThanOrEqual(0);
      expect(book.rating).toBeLessThanOrEqual(5);
    }
  });

  it('images are valid URLs', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const book of books) {
      expect(book.image).toMatch(urlRegex);
    }
  });

  it('featured is boolean when present', () => {
    for (const book of books) {
      if (book.featured !== undefined) {
        expect(typeof book.featured).toBe('boolean');
      }
    }
  });

  it('has at least one featured book for the slideshow', () => {
    const featured = books.filter((b) => b.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });

  it('has unique titles', () => {
    const titles = books.map((b) => b.title);
    const uniqueTitles = new Set(titles);

    expect(uniqueTitles.size).toBe(titles.length);
  });
});
