import { useEffect, useState } from 'react';
import { fetchVehicles } from '@api/vehicles';
import { useAppContext } from '@/hooks/useAppContext.ts';
import { Vehicles } from '@components/Vehicles/Vehicles';
import { Spinner } from '@components/UI/Spinner/Spinner.tsx';
import { SearchFilters } from '@components/SearchFilters/SearchFilters.tsx';
import type { Vehicle } from '@/types/vehicle.ts';

export const Home = () => {
  const { state, dispatch } = useAppContext();
  const { loading, vehicles } = state;
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[] | null>(
    vehicles || null
  );

  useEffect(() => {
    const loadVehicles = async (): Promise<void> => {
      dispatch({ type: 'LOAD_START' });

      try {
        const data = await fetchVehicles();

        dispatch({ type: 'LOAD_SUCCESS', payload: data.products });
        setFilteredVehicles(data.products);
      } catch (err) {
        dispatch({
          type: 'LOAD_ERROR',
          payload:
            err instanceof Error ? err.message : 'Failed to load vehicles',
        });
      }
    };

    loadVehicles().catch(console.error);
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section>
      <SearchFilters vehicles={vehicles} onFilterChange={setFilteredVehicles} />
      <Vehicles filteredVehicles={filteredVehicles} />
    </section>
  );
};
