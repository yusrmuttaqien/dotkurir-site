import type { Locale } from '@/types/i18n';
import type { ReactNode } from 'react';

export type Params = { lang: Locale; [key: string]: string | string[] | undefined };
export type RouteProps = Readonly<{
  params: Params;
}>;
export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;
