import Search from '../Search';
import Box from '@/svg/Box';
import type { HeadProps } from './type';

export default function Head(props: HeadProps) {
  const { contents } = props;
  const { search } = contents;

  return (
    <section className="mt-[30svh] grid place-content-center">
      <h1 className="trim-nohemi text-clamp-[40_176_320_1280] font-extrabold text-center tracking-wider">
        Cek{' '}
        <span className="inline-grid place-content-start mr-[.1ch]">
          <Box className="h-[.7em] text-yellow" />
        </span>
        ngkir
      </h1>
      <p className="text-center trim-nohemi-height text-clamp-[9.6_32_320_1280] -mt-[1em]">
        Solusi cepat untuk Ongkos Kirim yang tepat!
      </p>
      <Search className="mt-4" contents={search} />
    </section>
  );
}
