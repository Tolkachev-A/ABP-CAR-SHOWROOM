import React, { useReducer } from 'react';
import { AppContext } from './AppContext';
import { appReducer } from './appReducer';
import type { AppState } from '@/types/app-context.ts';

const initialState: AppState = {
  loading: false,
  error: null,
  vehicles: null,
};

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
