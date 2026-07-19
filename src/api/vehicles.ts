import type { VehicleResponse } from '../types/vehicle';
import { API_URLS } from '../constants/api';

export const fetchVehicles = async (): Promise<VehicleResponse> => {
  const response = await fetch(API_URLS.VEHICLES);
  return await response.json();
};
