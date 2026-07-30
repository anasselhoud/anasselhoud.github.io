'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ExpandIcon } from '@/components/Icons';
import type { AstroPhoto } from '@/data/astrophotography';

import Lightbox from './Lightbox';

interface GalleryProps {
  photos: AstroPhoto[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="astro-grid" aria-label="Astrophotography gallery">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={photo.slug}
            className="astro-tile"
            onClick={() => setOpenIndex(i)}
          >
            <Image
              src={photo.thumb}
              alt={photo.caption ?? ''}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw"
              priority={i < 4}
            />
            <span className="astro-tile-overlay" aria-hidden="true">
              <ExpandIcon size={22} />
            </span>
            {photo.caption && (
              <span className="astro-tile-caption">{photo.caption}</span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
