import './vehicles.scss';
import { useEffect, useState } from 'react';
import { fetchVehicles } from '@api/vehicles';
import type { Vehicle } from '@/types/vehicle';
import { VehicleCard } from '@components/VehicleCard/VehicleCard.tsx';

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const data = await fetchVehicles();
        console.log('Fetched vehicles:', data.products);
        setVehicles(data.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load vehicles'
        );
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleViewDetails = (vehicleId: number) => {
    console.log(`View details for vehicle: ${vehicleId}`);
    // TODO: Navigate to vehicle detail page
  };

  if (loading) {
    return <div className="vehicles__loading">Loading vehicles...</div>;
  }

  if (error) {
    return <div className="vehicles__error">Error: {error}</div>;
  }

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
