'use client';

import QueryProvider from './query';
import { Provider } from 'jotai';
import type { ProvidersProps } from './type';

export default function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <Provider>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
}
