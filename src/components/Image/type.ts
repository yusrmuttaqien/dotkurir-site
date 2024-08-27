import { IMAGE_STYLES } from './';
import type { Locale } from '@/types/i18n';
import type { ImageProps as NextImageProps, StaticImageData } from 'next/image';

export type ImageProps = {
  className?: Partial<typeof IMAGE_STYLES.slots>;
  src: string | StaticImageData;
  alt: string;
  loaderContent?:
    | string
    | ((params: {
        alt: string;
        lang: Locale;
        defaultContent: string;
        state: { isLoading: boolean; isError: boolean };
      }) => string);
} & Omit<NextImageProps, 'src' | 'alt' | 'className'>;
