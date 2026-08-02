import Image from 'next/image';

import type { FeaturedGame } from '@/data/gaming';

import PlatformIcon from './PlatformIcon';

interface FeaturedCardProps {
  game: FeaturedGame;
}

export default function FeaturedCard({ game }: FeaturedCardProps) {
  const {
    title,
    description,
    image,
    platform,
    hours,
    badge,
    genre,
    progression,
  } = game;

  return (
    <article className="gaming-featured-card">
      <div className="gaming-featured-media">
        {image && (
          <>
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div className="gaming-featured-scrim" aria-hidden="true" />
          </>
        )}
        <span className={`gaming-badge gaming-badge--${badge.toLowerCase()}`}>
          {badge}
        </span>
      </div>

      <div className="gaming-featured-body">
        <h3 className="gaming-featured-title">{title}</h3>
        <p className="gaming-featured-desc">{description}</p>

        <dl className="gaming-featured-stats">
          <div>
            <dt>Platform</dt>
            <dd>
              <PlatformIcon platform={platform} size={15} />
            </dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{hours}</dd>
          </div>
          <div>
            <dt>Genre</dt>
            <dd>{genre}</dd>
          </div>
        </dl>

        <div
          className="gaming-progress"
          aria-label={`${progression}% complete`}
        >
          <div className="gaming-progress-track">
            <div
              className="gaming-progress-fill"
              style={{ width: `${progression}%` }}
            />
          </div>
          <span className="gaming-progress-label">{progression}%</span>
        </div>
      </div>
    </article>
  );
}
