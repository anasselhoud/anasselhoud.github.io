'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from '@/components/Icons';
import type { AstroPhoto } from '@/data/astrophotography';
import { ASTRO_FULL_IMAGE } from '@/lib/utils';

const FOCUSABLE_SELECTOR = 'button:not([disabled])';

interface LightboxProps {
  photos: AstroPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const photo = photos[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate],
  );

  // Body scroll lock (iOS-safe)
  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Escape to close, arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext]);

  // Focus management: trap focus in the dialog, restore on close
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    return () => {
      previousActiveElement.current?.focus();
    };
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusable =
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? 'Astrophotography image'}
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon size={22} />
      </button>

      <button
        type="button"
        className="lightbox-arrow lightbox-arrow--prev"
        onClick={goPrev}
        aria-label="Previous photo"
      >
        <ChevronLeftIcon size={24} />
      </button>

      <figure className="lightbox-figure">
        <Image
          src={photo.full}
          alt={photo.caption ?? ''}
          className="lightbox-image"
          width={ASTRO_FULL_IMAGE.width}
          height={ASTRO_FULL_IMAGE.height}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
        {(photo.caption || photo.location) && (
          <figcaption className="lightbox-caption">
            {photo.caption && (
              <span className="lightbox-caption-text">{photo.caption}</span>
            )}
            {photo.location && (
              <span className="lightbox-caption-location">
                {photo.location}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      <button
        type="button"
        className="lightbox-arrow lightbox-arrow--next"
        onClick={goNext}
        aria-label="Next photo"
      >
        <ChevronRightIcon size={24} />
      </button>

      <p className="lightbox-count">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
