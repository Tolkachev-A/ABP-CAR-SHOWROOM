import { createContext } from 'react';
import type { AppContextType } from '@/types/app-context.ts';

export const AppContext = createContext<AppContextType | undefined>(undefined);
