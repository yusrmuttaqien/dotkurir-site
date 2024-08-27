import getContents from '@/app/(index)/contents';

export type HeadProps = {
  contents: Awaited<ReturnType<typeof getContents>>['hero'];
};
