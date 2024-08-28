import getContents from '@/app/[lang]/(index)/contents';

export type HistoryProps = {
  contents: Awaited<ReturnType<typeof getContents>>['history'];
  className?: string;
};
