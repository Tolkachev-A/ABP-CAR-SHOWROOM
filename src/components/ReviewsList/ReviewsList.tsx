import { Rating } from '@components/UI/Rating/Rating';
import type { Review } from '@/types/vehicle';
import { getInitials, formatDate } from '@/utils/format';
import './reviews-list.scss';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="reviews-list">
        <p className="reviews-list__empty">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="reviews-list__item">
          <div className="reviews-list__header">
            <div className="reviews-list__avatar">
              {getInitials(review.reviewerName)}
            </div>
            <div className="reviews-list__info">
              <h4 className="reviews-list__name">{review.reviewerName}</h4>
              <time className="reviews-list__date">
                {formatDate(review.date)}
              </time>
            </div>
          </div>
          <div className="reviews-list__rating">
            <Rating rating={review.rating} />
          </div>
          <p className="reviews-list__comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
