import type { UseQueryOptions } from '@tanstack/react-query';
import type { GenericResponse } from '@/types/data';

export type CityStructure = {
  id: string;
  province_id: string;
  province: string;
  type: string;
  city: string;
  postal_code: string;
};
export type DataStructure = {
  cities: CityStructure[];
} & GenericResponse;
export type CitiesParams = {
  params?: string;
  key?: string | string[];
} & Partial<UseQueryOptions<DataStructure, Error>>;
export type CitiesFetcherParams = {
  params?: string;
  key?: string | string[];
} & Partial<UseQueryOptions<DataStructure, Error>>;
