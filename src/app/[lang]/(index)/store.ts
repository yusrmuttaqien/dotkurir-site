import { atomWithStorage } from 'jotai/utils';
import type { DataStructure } from '@/hooks/costs/type';
import type { GenericResponse } from '@/types/data';

export const searchHistory = atomWithStorage<
  Omit<Partial<DataStructure>, 'errors' | keyof GenericResponse>[]
>('searchHistory', []);
