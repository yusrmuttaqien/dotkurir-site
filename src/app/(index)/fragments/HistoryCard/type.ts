import getContents from '@/app/(index)/contents';
import type { DataStructure } from '@/hooks/costs/type';
import type { GenericResponse } from '@/types/data';

export type HistoryCardProps = {
  className?: string;
  content: Omit<DataStructure, 'errors' | keyof GenericResponse> &
    Awaited<ReturnType<typeof getContents>>['history']['card'];
};
export type CostProps = {
  content: {
    service: string;
    desc: string;
    price: string;
    etd: string;
    note: string;
  };
};
