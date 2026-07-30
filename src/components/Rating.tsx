import { StarIcon } from '@/components/Icons';

const STAR_COUNT = 5;

interface RatingProps {
  rating: number;
  size?: number;
}

export default function Rating({ rating, size = 13 }: RatingProps) {
  const clamped = Math.min(STAR_COUNT, Math.max(0, rating));

  return (
    <div
      className="rating"
      aria-label={`Rated ${clamped} out of ${STAR_COUNT}`}
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const fill = Math.min(1, Math.max(0, clamped - i));
        return (
          <span
            key={i}
            className="rating-star"
            style={{ width: size, height: size }}
          >
            <StarIcon
              size={size}
              filled={false}
              className="rating-star-outline"
            />
            {fill > 0 && (
              <span
                className="rating-star-fill-clip"
                style={{ '--fill': fill } as React.CSSProperties}
              >
                <StarIcon size={size} filled className="rating-star-fill" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
