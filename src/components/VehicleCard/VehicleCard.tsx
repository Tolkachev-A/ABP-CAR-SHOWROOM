import './vehicle-card.scss';
import type { Vehicle } from '@src/types/vehicle';
import { Button } from '@components/UI/Button/Button.tsx';
import { Rating } from '@components/UI/Rating/Rating';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/enums/routes.ts';
import { calculateDiscountedPrice } from '@/utils/price.ts';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();

  const { thumbnail, title, rating, price, discountPercentage, brand, id, availabilityStatus } =
    vehicle;

  const discountedPrice = calculateDiscountedPrice(price, discountPercentage);

  return (
    <article className="vehicle-card">
      <div className="vehicle-card__image-wrapper">
        <img src={thumbnail} alt={title} className="vehicle-card__image" />
      </div>

      <div className="vehicle-card__content">
        <h3 className="vehicle-card__title">{title}</h3>

        <Rating rating={rating} />

        <div className="vehicle-card__price-row">
          <span className="vehicle-card__price">${discountedPrice}</span>
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
          <span className="status-badge">{availabilityStatus}</span>
        </div>

        <Button
          onClick={() =>
            navigate(`${ROUTES.VEHICLE_DETAIL.replace(':id', id.toString())}`)
          }
          aria-label={`View details for ${title}`}
        >
          View Details →
        </Button>
      </div>
    </article>
  );
};
