import type { UseQueryOptions } from '@tanstack/react-query';
import type { GenericResponse } from '@/types/data';

export type ProvinceStructure = {
  id: string;
  province: string;
};
export type DataStructure = {
  provinces: ProvinceStructure[];
} & GenericResponse;
export type ProvinciesParams = {
  params?: string;
  key?: string;
} & Partial<UseQueryOptions<DataStructure, Error>>;
export type ProvincesFetcherParams = {
  params?: string;
  key?: string;
} & Partial<UseQueryOptions<DataStructure, Error>>;
