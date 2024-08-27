import { easeInOut, type MotionProps } from 'framer-motion';

export const INFO_VARIANTS = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-100%' },
  transition: { ease: easeInOut, duration: 0.8, delay: 0.2 },
} as MotionProps;
