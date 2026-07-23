import { Rating } from '@components/UI/Rating/Rating';
import { calculateDiscountedPrice } from '@/utils/price';
import type { Review, Vehicle } from '@/types/vehicle';
import './vehicle-info.scss';

interface VehicleInfoProps {
  vehicle: Vehicle;
  reviews: Review[];
}

export const VehicleInfo = ({ vehicle, reviews }: VehicleInfoProps) => {
  const {
    title,
    rating,
    price,
    discountPercentage,
    availabilityStatus,
    stock,
    description,
    brand,
    category,
    sku,
    weight,
  } = vehicle;

  const discountedPrice = calculateDiscountedPrice(price, discountPercentage);

  const keyInfo = [
    { label: 'Brand:', value: brand },
    { label: 'Category:', value: category },
    { label: 'SKU:', value: sku },
    { label: 'Weight:', value: `${weight} kg` },
  ];

  return (
    <div className="vehicle-info">
      <div className="vehicle-info__header">
        <h1 className="vehicle-info__title">{title}</h1>
        <div className="vehicle-info__rating">
          <Rating rating={rating} />
          <span className="vehicle-info__reviews">
            ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="vehicle-info__price-section">
        <div className="vehicle-info__price-block">
          <div className="vehicle-info__current-price">${discountedPrice}</div>
          {discountPercentage > 0 && (
            <>
              <div className="vehicle-info__original-price">
                ${price.toFixed(2)}
              </div>
              <div className="vehicle-info__discount">
                -{discountPercentage}%
              </div>
            </>
          )}
        </div>
      </div>

      <div className="vehicle-info__status">
        <div className="vehicle-info__status-item">
          <span className="vehicle-info__status-label">Availability:</span>
          <span className="status-badge">{availabilityStatus}</span>
        </div>
        <div className="vehicle-info__status-item">
          <span className="vehicle-info__status-label">Stock:</span>
          <span>{stock}</span>
        </div>
      </div>

      <p className="vehicle-info__description">{description}</p>

      <div className="vehicle-info__specs">
        <h3 className="vehicle-info__specs-title">Key Information</h3>
        <div className="vehicle-info__specs-grid">
          {keyInfo.map((item, index) => (
            <div key={index} className="vehicle-info__spec-item">
              <span className="vehicle-info__spec-label">{item.label}</span>
              <span className="vehicle-info__spec-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
