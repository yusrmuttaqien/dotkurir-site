import type { HTMLInputTypeAttribute } from 'react';

export type InputProps = {
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  isDisabled?: boolean;
  name?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (props: { value: string; name: string }) => void;
  label?: string;
};
