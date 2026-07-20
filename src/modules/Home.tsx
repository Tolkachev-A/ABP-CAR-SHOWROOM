import { useEffect } from 'react';
import { fetchVehicles } from '@api/vehicles';
import { useAppContext } from '@/hooks/useAppContext.ts';
import { Vehicles } from '@components/Vehicles/Vehicles';
import { Spinner } from '@components/UI/Spinner/Spinner.tsx';

export const Home = () => {
  const { state, dispatch } = useAppContext();
  const { loading } = state;

  useEffect(() => {
    const loadVehicles = async (): Promise<void> => {
      dispatch({ type: 'LOAD_START' });

      try {
        const data = await fetchVehicles();

        dispatch({ type: 'LOAD_SUCCESS', payload: data.products });
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
      <Vehicles />
    </section>
  );
};
