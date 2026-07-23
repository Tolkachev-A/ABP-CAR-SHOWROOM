import type { Vehicle } from '@/types/vehicle';
import './vehicle-characteristics.scss';

interface VehicleCharacteristicsProps {
  vehicle: Vehicle;
}

interface CharacteristicItem {
  label: string;
  value: string | number;
}

export const VehicleCharacteristics = ({
  vehicle,
}: VehicleCharacteristicsProps) => {
  const {
    dimensions: { width, height, depth },
    warrantyInformation,
    shippingInformation,
    returnPolicy,
  } = vehicle;

  const characteristics: CharacteristicItem[] = [
    {
      label: 'Dimensions',
      value: `${width} × ${height} × ${depth} cm`,
    },
    {
      label: 'Warranty Information',
      value: warrantyInformation,
    },
    {
      label: 'Shipping Information',
      value: shippingInformation,
    },
    {
      label: 'Return Policy',
      value: returnPolicy,
    },
  ];

  return (
    <div className="vehicle-characteristics">
      <h2 className="vehicle-characteristics__title">Specifications</h2>
      <div className="vehicle-characteristics__grid">
        {characteristics.map((item, index) => (
          <div key={index} className="vehicle-characteristics__item">
            <div className="vehicle-characteristics__label">{item.label}</div>
            <div className="vehicle-characteristics__value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
