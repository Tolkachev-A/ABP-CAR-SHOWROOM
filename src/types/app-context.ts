import type { Dispatch } from 'react';

export type AppState = {
  loading: boolean;
  error: string | null;
};

export type AppAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'LOAD_ERROR'; payload: string | null };

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};
