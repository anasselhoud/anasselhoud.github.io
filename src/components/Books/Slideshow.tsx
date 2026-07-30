'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import Rating from '@/components/Rating';
import type { Book } from '@/data/books';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface SlideshowProps {
  books: Book[];
}

const SWIPE_THRESHOLD = 40;
const AUTOPLAY_INTERVAL_MS = 5000;

/** How many slides are on screen at once — driven by the `--slides-per-view`
 * custom property set in books.css, so the breakpoints live in one place. */
function readSlidesPerView(el: HTMLElement | null): number {
  if (!el) return 1;
  const raw = getComputedStyle(el).getPropertyValue('--slides-per-view');
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default function Slideshow({ books }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const maxIndex = Math.max(0, books.length - slidesPerView);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const sync = () => setSlidesPerView(readSlidesPerView(el));
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (next: number) => {
      const pageCount = maxIndex + 1;
      setIndex(((next % pageCount) + pageCount) % pageCount);
    },
    [maxIndex],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Autoplay — off for reduced motion, paused on hover/focus so it never
  // fights a reader who's actually looking at a slide.
  useEffect(() => {
    if (maxIndex === 0 || prefersReducedMotion || isPaused) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [maxIndex, prefersReducedMotion, isPaused]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (deltaX > SWIPE_THRESHOLD) {
      goPrev();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      goNext();
    }
  };

  if (books.length === 0) return null;

  return (
    <div
      className="books-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured books"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="books-slideshow-viewport"
        ref={viewportRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`books-slideshow-track${prefersReducedMotion ? ' books-slideshow-track--instant' : ''}`}
          style={{ '--slide-index': index } as React.CSSProperties}
        >
          {books.map((book, i) => {
            const isVisible = i >= index && i < index + slidesPerView;
            return (
              <div
                className="books-slideshow-slide"
                key={book.title}
                aria-hidden={!isVisible}
                inert={!isVisible}
              >
                <div className="books-slideshow-media">
                  <img
                    src={book.image}
                    alt={book.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="books-slideshow-content">
                  <p className="books-card-category">{book.category}</p>
                  <h3 className="books-slideshow-title">{book.title}</h3>
                  <p className="books-slideshow-author">by {book.author}</p>
                  <Rating rating={book.rating} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="books-slideshow-controls">
          <button
            type="button"
            className="books-slideshow-arrow"
            onClick={goPrev}
            aria-label="Previous featured book"
          >
            <ChevronLeftIcon size={18} />
          </button>

          <div className="books-slideshow-dots">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                type="button"
                key={i}
                className="books-slideshow-dot"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="books-slideshow-arrow"
            onClick={goNext}
            aria-label="Next featured book"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
