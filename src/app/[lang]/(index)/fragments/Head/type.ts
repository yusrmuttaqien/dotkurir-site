import getContents from '@/app/[lang]/(index)/contents';
import type { Params } from '@/app/[lang]/(index)/type';

export type HeadProps = {
  contents: Awaited<ReturnType<typeof getContents>>['head'];
  className?: string;
  params: Params;
};
