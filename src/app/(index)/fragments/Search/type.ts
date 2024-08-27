import getContents from '@/app/(index)/contents';
export type SearchProps = {
  className?: string;
  contents: Awaited<ReturnType<typeof getContents>>['hero']['search'];
};
