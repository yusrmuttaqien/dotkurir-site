import { tv } from 'tailwind-variants';
import type { ClassMergeParams } from './type';

export default function classMerge(...classes: ClassMergeParams): string {
  return tv({ base: classes })();
}
