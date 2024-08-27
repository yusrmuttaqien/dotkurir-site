import type { ReactNode, ComponentProps } from 'react';
import { ListboxOption } from '@headlessui/react';

export type ComboBoxProps<K> = {
  // NOTE: Children[0] is for select key to show in button, the [1] is for option props mapping
  children: [
    (params: { selected: K | null }) => ReactNode,
    (params: { current: K }) => ComponentProps<typeof ListboxOption>
  ];
  placeholder: ReactNode;
  options: K[];
  optionKey: (params: { current: K }) => any;
  onChange?: (params: { value: K | null }) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  error?: string;
  name?: string;
  label?: string;
};
