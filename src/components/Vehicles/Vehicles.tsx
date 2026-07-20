import './vehicles.scss';

import { VehicleCard } from '@components/VehicleCard/VehicleCard.tsx';
import { useAppContext } from '@/hooks/useAppContext.ts';

export const Vehicles = () => {
  const { state } = useAppContext();
  const { vehicles } = state;

  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles available</div>;
  }

  const handleViewDetails = (vehicleId: number) => {
    console.log(`View details for vehicle: ${vehicleId}`);
    // TODO: Navigate to vehicle detail page
  };

  return (
    <div className="vehicles">
      <div className="vehicles__header">
        <h2 className="vehicles__title">Our Fleet</h2>
        <p className="vehicles__subtitle">
          {vehicles.length} vehicles available
        </p>
      </div>
      <div className="vehicles__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};
