import getContents from '@/app/[lang]/(index)/contents';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { FormSubmit } from '@/app/[lang]/(index)/fragments/Search/type';
import type { GenericResponse } from '@/types/data';

export type CostStructure = {
  service: string;
  desc: string;
  prices: {
    price: string;
    etd: string;
    note: string;
  }[];
};
export type DataStructure = {
  costs: CostStructure[] | [];
  courier: { name: string; code: string };
  date: string;
  key: string;
  route: { from: string; to: string };
  errors: FormSubmit;
  weight: number;
} & GenericResponse;
export type CostsParams = {
  values: FormSubmit;
  key?: string | string[];
  contents: Awaited<ReturnType<typeof getContents>>['head']['search'];
} & Partial<UseQueryOptions<DataStructure, Error>>;
export type CostsFetcherParams = {
  values: FormSubmit;
  key?: string | string[];
  contents: Awaited<ReturnType<typeof getContents>>['head']['search'];
} & Partial<UseQueryOptions<DataStructure, Error>>;
