import type { ChevronXProps } from './type';

export default function ChevronX(props: ChevronXProps) {
  const { ...rest } = props;

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M2 17.5L12 7.5L22 17.5"
        stroke="currentColor"
        strokeWidth="2.85714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
