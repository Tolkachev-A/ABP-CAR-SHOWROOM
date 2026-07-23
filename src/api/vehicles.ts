import type { VehicleResponse, Vehicle } from '../types/vehicle';
import { API_URLS } from '../constants/api';

export const fetchVehicles = async (): Promise<VehicleResponse> => {
  const response = await fetch(API_URLS.VEHICLES);
  return await response.json();
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await fetch(`${API_URLS.VEHICLES_ID}${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  return await response.json();
};
