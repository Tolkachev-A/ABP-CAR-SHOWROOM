import { type FormEvent, useState } from 'react';
import { Button } from '@components/UI/Button/Button';
import { Rating } from '@components/UI/Rating/Rating';
import type { Review } from '@/types/vehicle';
import type { FormErrors } from '@/types/validation';
import { validateReviewForm } from '@/utils/validation';
import './review-form.scss';

interface ReviewFormProps {
  vehicleId: number;
  onReviewAdded: (review: Review) => void;
}

export const ReviewForm = ({ vehicleId, onReviewAdded }: ReviewFormProps) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const validateForm = (): boolean => {
    const validationErrors = validateReviewForm(name, comment);
    setErrors(validationErrors);
    return !validationErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newReview: Review = {
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: name,
      reviewerEmail: '',
    };

    const reviewsData = JSON.parse(localStorage.getItem('reviews') || '{}');
    if (!reviewsData[vehicleId]) {
      reviewsData[vehicleId] = [];
    }
    reviewsData[vehicleId].push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviewsData));

    onReviewAdded(newReview);

    setName('');
    setComment('');
    setRating(5);
    setErrors({});
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">Add Your Review</h3>

      <div className="review-form__group">
        <label htmlFor="review-name" className="review-form__label">
          Name *
        </label>
        <input
          id="review-name"
          type="text"
          className={`review-form__input ${
            errors?.name ? 'review-form__input_error' : ''
          }`}
          value={name}
          onChange={(e) => {
            setName(e.target.value.slice(0, 50));
            if (errors?.name) setErrors({ ...errors, name: undefined });
          }}
          placeholder="Your name"
          maxLength={50}
        />
        {errors?.name && (
          <span className="review-form__error">{errors?.name}</span>
        )}
        <span className="review-form__char-count">
          {name.length}/50 characters
        </span>
      </div>

      <div className="review-form__group">
        <label htmlFor="review-comment" className="review-form__label">
          Comment *
        </label>
        <textarea
          id="review-comment"
          className={`review-form__textarea ${
            errors?.comment ? 'review-form__textarea_error' : ''
          }`}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value.slice(0, 300));
            if (errors?.comment) setErrors({ ...errors, comment: undefined });
          }}
          placeholder="Share your thoughts about this vehicle"
          maxLength={300}
          rows={5}
        />
        {errors?.comment && (
          <span className="review-form__error">{errors?.comment}</span>
        )}
        <span className="review-form__char-count">
          {comment.length}/300 characters
        </span>
      </div>

      <div className="review-form__group">
        <div className="review-form__label">Rating *</div>
        <div className="review-form__rating-wrapper">
          <Rating
            rating={rating}
            onRate={(selectedRating) => setRating(selectedRating)}
          />
        </div>
      </div>

      <div className={'review-form__btn'}>
        {' '}
        <Button type="submit">Add Comment</Button>
      </div>
    </form>
  );
};
