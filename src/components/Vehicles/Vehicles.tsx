import './vehicles.scss';
import { useEffect, useState } from 'react';
import { fetchVehicles } from '@api/vehicles';
import type { Vehicle } from '@/types/vehicle';

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchVehicles().then((data) => {
      setVehicles(data.products);
    });
  }, []);
  return <div>{vehicles.length} vehicles</div>;
};
