import type { Metadata } from 'next';
import Link from 'next/link';

import Card from '@/components/Books/Card';
import Slideshow from '@/components/Books/Slideshow';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import books from '@/data/books';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const BOOKS_URL = `${SITE_URL}/books/`;
const BOOKS_DESCRIPTION =
  'A curated collection of books and ideas that shaped my thinking.';

export const metadata: Metadata = createPageMetadata({
  title: 'Books',
  description: BOOKS_DESCRIPTION,
  path: '/books/',
});

const featuredBooks = books.filter((book) => book.featured);
const otherBooks = books.filter((book) => !book.featured);

export default function BooksPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: BOOKS_URL,
            name: 'Books',
            description: BOOKS_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(BOOKS_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Books', url: BOOKS_URL },
          ]),
        ]}
      />
      <article className="books-page">
        <header className="books-header">
          <div>
            <p className="books-eyebrow">Reading list</p>
            <h1 className="page-title">Books</h1>
            <p className="books-intro">
              A curated collection of books, ideas, and deep dives that keep me
              thinking beyond the next project.
            </p>
          </div>
          <Link href="/" className="books-back-link">
            ← Back home
          </Link>
        </header>

        <section
          className="books-section"
          aria-labelledby="featured-books-heading"
        >
          <div className="books-section-heading">
            <div>
              <h2 id="featured-books-heading">Recently featured</h2>
              <p>The picks I’m currently carrying with me into the week.</p>
            </div>
          </div>
          <Slideshow books={featuredBooks} />
        </section>

        <section className="books-section" aria-labelledby="more-books-heading">
          <div className="books-section-heading">
            <div>
              <h2 id="more-books-heading">Popular, old but gold</h2>
              <p>
                A wider shelf of classics and deep thinkers that still hold up.
              </p>
            </div>
          </div>
          <div className="books-grid" aria-label="More recommended books">
            {otherBooks.map((book) => (
              <Card key={book.title} book={book} />
            ))}
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
