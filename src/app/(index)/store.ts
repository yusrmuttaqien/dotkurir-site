import { atom } from 'jotai';
import type { DataStructure } from '@/hooks/costs/type';
import type { GenericResponse } from '@/types/data';

export const searchHistory = atom<Omit<Partial<DataStructure>, 'errors' | keyof GenericResponse>[]>(
  []
);
