import getContents from '@/app/(index)/contents';

export type SearchProps = {
  className?: string;
  contents: Awaited<ReturnType<typeof getContents>>['hero']['search'];
};
export type FormSubmit =
  | {
      courier: string | undefined;
      weight: string | undefined;
      destProv: string | undefined;
      destCit: string | undefined;
      oriProv: string | undefined;
      oriCit: string | undefined;
    }
  | undefined;
