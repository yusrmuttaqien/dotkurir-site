import getContents from '@/app/(index)/contents';

export type HistoryProps = {
  contents: Awaited<ReturnType<typeof getContents>>['history'];
  className?: string;
};
