import Link from 'next/link';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { provincesFetcher } from '@/hooks/provinces';
import Search from '../Search';
import Language from '../Language';
import Box from '@/svg/Box';
import classMerge from '@/utils/classMerge';
import type { HeadProps } from './type';

export default async function Head(props: HeadProps) {
  const { contents, className } = props;
  const { search, by, source_code, tagline } = contents;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(provincesFetcher());

  return (
    <section className={classMerge('grid place-content-center', className)}>
      <div className="flex justify-between items-center opacity-55 underline wrapper flex-wrap gap-4">
        <Link target="_blank" href="https://yusrmuttaqien.vercel.app">
          {by} Yusril Muttaqien
        </Link>
        <Link target="_blank" href="https://github.com/yusrmuttaqien/dotkurir-site">
          {source_code}
        </Link>
        <Language />
        <Link target="_blank" href="https://rajaongkir.com/dokumentasi">
          API RajaOngkir
        </Link>
      </div>
      <h1 className="trim-nohemi text-clamp-[40_176_320_1280] font-extrabold text-center tracking-wider">
        Cek{' '}
        <span className="inline-grid place-content-start mr-[.1ch]">
          <Box className="h-[.7em] text-yellow" />
        </span>
        ngkir
      </h1>
      <p className="text-center trim-nohemi-height text-clamp-[14_32_320_1280] -mt-[0.3em] wrapper">
        <span className="wrapper">{tagline}</span>
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search className="mt-10 wrapper" contents={search} />
      </HydrationBoundary>
    </section>
  );
}
