import './vehicle-card.scss';
import type { Vehicle } from '@/types/vehicle';
import { Button } from '@components/UI/Button/Button.tsx';
import { Rating } from '@components/UI/Rating/Rating';

type VehicleCardProps = {
  vehicle: Vehicle;
  onViewDetails?: (vehicleId: number) => void;
};

const getAvailabilityModifier = (status: string): string => {
  return status.toLowerCase().replace(/\s+/g, '-');
};

export const VehicleCard = ({ vehicle, onViewDetails }: VehicleCardProps) => {
  const availabilityModifier = getAvailabilityModifier(
    vehicle.availabilityStatus
  );

  const { thumbnail, title, rating, price, discountPercentage, brand, id } =
    vehicle;

  return (
    <article className="vehicle-card">
      <div className="vehicle-card__image-wrapper">
        <img src={thumbnail} alt={title} className="vehicle-card__image" />
      </div>

      <div className="vehicle-card__content">
        <h3 className="vehicle-card__title">{title}</h3>

        <Rating rating={rating} />

        <div className="vehicle-card__price-row">
          <span className="vehicle-card__price">${price}</span>
          {discountPercentage > 0 && (
            <span className="vehicle-card__discount">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="vehicle-card__info-item">
          <span className="vehicle-card__label">Brand:</span>
          <span className="vehicle-card__value">{brand}</span>
        </div>

        <div className="vehicle-card__info-item">
          <span className="vehicle-card__label">Availability:</span>
          <span
            className={`vehicle-card__availability vehicle-card__availability_${availabilityModifier}`}
          >
            {vehicle.availabilityStatus}
          </span>
        </div>

        <Button
          onClick={() => onViewDetails?.(id)}
          aria-label={`View details for ${title}`}
        >
          View Details →
        </Button>
      </div>
    </article>
  );
};
