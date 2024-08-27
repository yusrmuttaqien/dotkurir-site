import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { provincesFetcher } from '@/hooks/provinces';
import { citiesFetcher } from '@/hooks/cities';
import Search from '../Search';
import Box from '@/svg/Box';
import type { HeadProps } from './type';

export default async function Head(props: HeadProps) {
  const { contents } = props;
  const { search } = contents;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(provincesFetcher());

  return (
    <section className="mt-[30svh] grid place-content-center">
      <h1 className="trim-nohemi text-clamp-[40_176_320_1280] font-extrabold text-center tracking-wider">
        Cek{' '}
        <span className="inline-grid place-content-start mr-[.1ch]">
          <Box className="h-[.7em] text-yellow" />
        </span>
        ngkir
      </h1>
      <p className="text-center trim-nohemi-height text-clamp-[14_32_320_1280] -mt-[0.3em] wrapper">
        <span className="wrapper">Solusi cepat untuk Ongkos Kirim yang tepat!</span>
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search className="mt-10 wrapper" contents={search} />
      </HydrationBoundary>
    </section>
  );
}
