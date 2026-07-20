import type { Dispatch } from 'react';
import type { Vehicle } from '@/types/vehicle.ts';

export type AppState = {
  loading: boolean;
  error: string | null;
  vehicles: Vehicle[] | null;
};

export type AppAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Vehicle[] }
  | { type: 'LOAD_ERROR'; payload: string | null };

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};
