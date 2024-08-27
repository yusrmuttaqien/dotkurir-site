import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};
