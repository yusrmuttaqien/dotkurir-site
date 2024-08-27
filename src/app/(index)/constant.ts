import localFont from 'next/font/local';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cek Ongkir',
  description: 'Cek tarif ongkir ke seluruh penjuru Indonesia',
  generator: 'Next.js',
  applicationName: 'dotkurir',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Yusril Muttaqien', url: 'idyusril@gmail.com' }],
  creator: 'Yusril Muttaqien',
  publisher: 'Yusril Muttaqien',
  openGraph: {
    type: 'website',
    url: 'https://yusrmuttaqien.vercel.app',
    title: 'Cek Ongkir',
    description: 'Cek tarif ongkir ke seluruh penjuru Indonesia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cek Ongkir',
    description: 'Cek tarif ongkir ke seluruh penjuru Indonesia',
  },
};
export const nohemi = localFont({
  src: [
    {
      style: 'normal',
      path: '../../fonts/Nohemi-Thin.woff',
      weight: '100',
    },
    {
      style: 'normal',
      path: '../../fonts/Nohemi-ExtraLight.woff',
      weight: '200',
    },
    {
      style: 'normal',
      path: '../../fonts/Nohemi-Light.woff',
      weight: '300',
    },
    {
      style: 'normal',
      path: '../../fonts/Nohemi-Regular.woff',
      weight: '400',
    },
    {
      style: 'normal',
      path: '../../fonts/Nohemi-ExtraBold.woff',
      weight: '800',
    },
  ],
  display: 'swap',
  variable: '--font-nohemi',
});
