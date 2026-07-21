import './vehicles.scss';

import { VehicleCard } from '@components/VehicleCard/VehicleCard.tsx';
import type { Vehicle } from '@/types/vehicle';

type VehiclesProps = {
  filteredVehicles: Vehicle[] | null;
};

export const Vehicles = ({ filteredVehicles }: VehiclesProps) => {
  if (!filteredVehicles || filteredVehicles.length === 0) {
    return <div>No vehicles available</div>;
  }

  return (
    <div className="vehicles">
      <div className="vehicles__header">
        <h2 className="vehicles__title">Our Fleet</h2>
        <p className="vehicles__subtitle">
          {filteredVehicles.length} vehicles available
        </p>
      </div>

      <div className="vehicles__grid">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="vehicles__no-results">
            No vehicles match your filters
          </div>
        )}
      </div>
    </div>
  );
};
