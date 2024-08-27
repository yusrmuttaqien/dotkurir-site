'use client';

import { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import Loading from '@/svg/Loading';
import ChevronX from '@/svg/ChevronX';
import classMerge from '@/utils/classMerge';
import type { ComboBoxProps } from './type';

export default function ComboBox<K>(props: ComboBoxProps<K>) {
  const {
    children,
    placeholder,
    options,
    optionKey,
    onChange,
    isDisabled,
    isLoading,
    name,
    error,
    label,
  } = props;
  const [selected, setSelected] = useState<K | null>(null);
  const Icon = isLoading ? Loading : ChevronX;

  function _onChange(value: K | null) {
    setSelected(value);
    onChange?.({ value, name: name || '' });
  }

  useEffect(() => {
    setSelected(null);
  }, [options]);

  return (
    <Listbox name={name} value={selected} onChange={_onChange} disabled={isDisabled || isLoading}>
      <ListboxButton
        className={classMerge(
          'bg-white/30 py-4 px-6 text-white rounded-md w-[min(230px,100%)] backdrop-blur-3xl',
          'select-none text-left flex items-center justify-between border border-white/15',
          'hover:bg-white/40 data-[open]:bg-white/40 data-[disabled]:opacity-55 transition-colors',
          'ease-in-out disabled:hover:bg-white/30 group relative gap-4',
          error && 'border-red-500',
          !selected && 'text-white/50'
        )}
      >
        {label && (
          <p className="absolute left-3 right-3 -top-[0.8em] line-clamp-1 text-white" title={label}>
            {label}
          </p>
        )}
        <span className="translate-y-[0.1em] line-clamp-1">
          {children[0]({ selected }) || placeholder}
        </span>
        <Icon
          className={classMerge(
            'size-[1em] rotate-180 group-data-[open]:rotate-0 transition-transform ease-in-out',
            'text-white'
          )}
        />
        {error && (
          <p className="absolute left-3 right-3 line-clamp-1 top-[calc(100%+0.1rem)] text-xs text-red-500">
            {error}
          </p>
        )}
      </ListboxButton>
      <ListboxOptions
        anchor={selected ? 'selection end' : 'bottom end'}
        className={classMerge(
          'bg-white/30 rounded-md p-2 backdrop-blur-3xl focus:outline-none',
          'w-[var(--button-width)] [--anchor-gap:0.8rem] border border-white/15',
          'transition-opacity duration-300 ease-in-out data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {options.map((option) => (
          <ListboxOption
            key={optionKey({ current: option })}
            className={classMerge(
              'py-4 px-4 select-none cursor-pointer hover:bg-gray-700/50 rounded-sm',
              'data-[focus]:bg-white/10 data-[selected]:bg-yellow/50 transition-colors'
            )}
            {...children[1]({ current: option })}
          />
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
