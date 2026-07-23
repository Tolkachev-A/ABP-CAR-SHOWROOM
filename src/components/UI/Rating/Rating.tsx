import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import './rating.scss';

type RatingProps = {
  rating?: number;
  onRate?: (rating: number) => void;
};

export const Rating = ({ rating, onRate }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const isInteractive = onRate !== undefined;
  const displayRating =
    hoverRating !== null ? hoverRating : rating || 0;

  const stars = useMemo(() => {
    const fullStars = Math.floor(displayRating);
    const partialPercent = (displayRating - fullStars) * 100;

    return Array.from({ length: 5 }).map((_, index) => {
      let fillPercent = 0;
      if (index < fullStars) {
        fillPercent = 100;
      } else if (index === fullStars) {
        fillPercent = partialPercent;
      }

      return (
        <span
          key={index}
          className={`rating__star ${isInteractive ? 'rating__star_interactive' : ''}`}
          style={{ '--star-fill': `${fillPercent}%` } as CSSProperties}
          onMouseEnter={() => isInteractive && setHoverRating(index + 1)}
          onMouseLeave={() => isInteractive && setHoverRating(null)}
          onClick={() => {
            if (isInteractive) {
              onRate(index + 1);
            }
          }}
        />
      );
    });
  }, [displayRating, isInteractive, onRate]);

  return (
    <div className="rating">
      <div className="rating__stars">{stars}</div>
      <span className="rating__value">{displayRating}</span>
    </div>
  );
};
