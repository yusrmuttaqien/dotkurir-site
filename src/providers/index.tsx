import QueryProvider from './query';
import type { ProvidersProps } from './type';

export default function Providers(props: ProvidersProps) {
  const { children } = props;

  return <QueryProvider>{children}</QueryProvider>;
}
