import { Button as HeadlessButton } from '@headlessui/react';
import classMerge from '@/utils/classMerge';
import type { ButtonProps } from './type';
import type { MouseEvent } from 'react';

export default function Button(props: ButtonProps) {
  const { children, className, isDisabled, onClick, type } = props;

  function _onClick(e: MouseEvent<HTMLButtonElement>) {
    !isDisabled && onClick?.(e);
  }

  return (
    <HeadlessButton
      onClick={_onClick}
      disabled={isDisabled}
      className={classMerge(
        'bg-white/10 py-4 px-6 text-white rounded-md w-[min(230px,100%)] backdrop-blur-3xl',
        'select-none text-left flex items-center justify-between border border-white/15',
        'hover:bg-white/20 data-[disabled]:opacity-55 transition-colors ease-in-out',
        'disabled:hover:bg-white/10 gap-4 active:bg-white/10',
        className
      )}
      type={type}
    >
      {children}
    </HeadlessButton>
  );
}
