import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchVehicleById } from '@api/vehicles';
import { useAppContext } from '@/hooks/useAppContext.ts';
import { VehicleGallery } from '@components/VehicleGallery/VehicleGallery';
import { VehicleInfo } from '@components/VehicleInfo/VehicleInfo';
import { VehicleCharacteristics } from '@components/VehicleCharacteristics/VehicleCharacteristics';
import { ReviewsList } from '@components/ReviewsList/ReviewsList';
import { ReviewForm } from '@components/ReviewForm/ReviewForm';
import { Spinner } from '@components/UI/Spinner/Spinner.tsx';
import type { Vehicle, Review } from '@/types/vehicle.ts';
import './vehicle-detail.scss';
import { ROUTES } from '@/enums/routes.ts';

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { loading } = state;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const loadVehicle = async (): Promise<void> => {
      dispatch({ type: 'LOAD_START' });

      try {
        const data = await fetchVehicleById(id);
        setVehicle(data);

        const reviewsData = JSON.parse(localStorage.getItem('reviews') || '{}');
        const savedReviews = reviewsData[id] || [];
        setReviews([...data.reviews, ...savedReviews]);

        dispatch({ type: 'LOAD_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'LOAD_ERROR',
          payload:
            err instanceof Error ? err.message : 'Failed to load vehicle',
        });
      }
    };

    loadVehicle().catch(console.error);
  }, [id, dispatch, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!vehicle) {
    return (
      <section className="vehicle-detail">
        <div className="vehicle-detail__error">
          <p>Vehicle not found</p>
          <button
            className="vehicle-detail__back-link"
            onClick={() => navigate('/')}
          >
            ← Back to vehicles
          </button>
        </div>
      </section>
    );
  }

  const handleReviewAdded = (newReview: Review) => {
    setReviews([...reviews, newReview]);
  };

  const { images, title, id: vehicleId } = vehicle;

  return (
    <section className="vehicle-detail">
      <button
        className="vehicle-detail__back-link"
        onClick={() => navigate(ROUTES.HOME)}
      >
        ← Back to vehicles
      </button>

      <div className="vehicle-detail__content">
        <div className="vehicle-detail__gallery">
          <VehicleGallery images={images} title={title} />
        </div>
        <div className="vehicle-detail__info">
          <VehicleInfo vehicle={vehicle} />
        </div>
      </div>

      <div className="vehicle-detail__characteristics">
        <VehicleCharacteristics vehicle={vehicle} />
      </div>

      <div className="vehicle-detail__reviews-section">
        <h2 className="vehicle-detail__reviews-title">Customer Reviews</h2>
        <ReviewsList reviews={reviews} />
      </div>

      <div className="vehicle-detail__form-section">
        <ReviewForm vehicleId={vehicleId} onReviewAdded={handleReviewAdded} />
      </div>
    </section>
  );
};
