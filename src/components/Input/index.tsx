import { Input as HeadlessInput } from '@headlessui/react';
import classMerge from '@/utils/classMerge';
import type { InputProps } from './type';
import type { ChangeEvent } from 'react';

const FIXES_STYLE = 'flex-shrink-0 line-clamp-1 bg-black/20 py-4 px-2 border-white/15';

export default function Input(props: InputProps) {
  const { prefix, suffix, placeholder, isDisabled, name, error, type, onChange, label } = props;

  function _onChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.({ value: e.target.value, name: name || '' });
  }

  return (
    <div
      tabIndex={-1}
      className={classMerge(
        'flex items-center w-[min(230px,100%)] bg-white/30 text-white rounded-md',
        'border border-white/15 relative focus-within:bg-white/40 hover:bg-white/40',
        'transition-colors ease-in-out',
        isDisabled && 'opacity-55 pointer-events-none',
        error && !isDisabled && 'border-red-500'
      )}
    >
      {label && (
        <p className="absolute left-3 right-3 -top-[0.8em] line-clamp-1" title={label}>
          {label}
        </p>
      )}
      {prefix && (
        <p className={classMerge('border-r -mr-[calc(1.5rem-0.5rem)]', FIXES_STYLE)} title={prefix}>
          {prefix}
        </p>
      )}
      <HeadlessInput
        name={name}
        type={type}
        disabled={isDisabled}
        className={classMerge(
          'flex-1 min-w-[30%] mx-6 bg-transparent focus:outline-none translate-y-[0.1em]'
        )}
        placeholder={placeholder}
        onChange={_onChange}
      />
      {suffix && (
        <p className={classMerge('border-l -ml-[calc(1.5rem-0.5rem)]', FIXES_STYLE)} title={suffix}>
          {suffix}
        </p>
      )}
      {error && !isDisabled && (
        <p className="absolute left-3 right-3 top-[calc(100%+0.1rem)] text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
