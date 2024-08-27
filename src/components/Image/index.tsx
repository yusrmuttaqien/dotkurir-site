'use client';

import NextImage from 'next/image';
import { tv } from 'tailwind-variants';
import { useParams } from 'next/navigation';
import { useState, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classMerge from '@/utils/classMerge';
import getContents from './contents';
import { INFO_VARIANTS } from './constant';
import type { Locale } from '@/types/i18n';
import type { ImageProps } from './type';

export const IMAGE_STYLES = tv({
  slots: {
    div: 'relative size-full isolate group/image',
    loader: classMerge(
      'absolute inset-0 z-10 bg-dynamic-[beige_55] backdrop-blur-sm text-dynamic-grey',
      'ease-out-quart duration-300 flex items-center justify-center body leading-normal',
      'normal-case font-normal overflow-hidden',
      'group-data-[status=load]/image:opacity-0 group-data-[status=load]/image:backdrop-blur-0',
      'group-data-[status=load]/image:pointer-events-none',
      'group-data-[status=error]/image:text-beige',
      'group-data-[status=error]/image:bg-red/55'
    ),
    img: 'object-contain z-0',
  },
});

export default function Image(props: ImageProps) {
  const { src, alt, className, onLoad, onError, loaderContent, ...rest } = props;
  const { lang } = useParams();
  const { loader } = getContents(lang as Locale);
  const { loading, error } = loader;
  const [status, setStatus] = useState<'nominal' | 'error'>('nominal');
  const { div, loader: loaderStyle, img } = IMAGE_STYLES();
  const loaderDefaultContent = `${status === 'nominal' ? loading : error}: ${alt}`;
  const isLoaderContentFunction = typeof loaderContent === 'function';
  const knownLoaderContent = isLoaderContentFunction
    ? loaderContent({
        alt,
        lang: lang as Locale,
        defaultContent: loaderDefaultContent,
        state: { isLoading: status === 'nominal', isError: status === 'error' },
      })
    : loaderDefaultContent;

  function _status(e: SyntheticEvent<HTMLImageElement, Event>) {
    const { dataset } = (e.target as HTMLImageElement).parentElement as HTMLDivElement;
    const { type } = e.nativeEvent;

    type === 'error' ? setStatus('error') : setStatus('nominal');
    type === 'error' ? onError?.(e) : onLoad?.(e);
    requestAnimationFrame(() => (dataset.status = type));
  }

  return (
    <div data-status="loading" className={div({ className: className?.div })}>
      <div className={loaderStyle({ className: className?.loader })}>
        <p className="grid place-content-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span {...INFO_VARIANTS} key={status}>
              {knownLoaderContent}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>
      <NextImage
        {...rest}
        fill
        src={src}
        alt={alt}
        sizes="100%"
        onLoad={_status}
        onError={_status}
        className={img({ className: className?.img })}
      />
    </div>
  );
}
