import classMerge from '@/utils/classMerge';
import { metadata as Metadata, nohemi } from './(index)/constant';
import type { RootLayoutProps } from './(index)/type';
import '../styles/index.css';

export const metadata = Metadata;
export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="!pr-0">
      <body className={classMerge('no-scrollbar', nohemi.variable)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
