import { DRAGGABLE_STYLES } from '.';

export type DraggableProps = {
  children: React.ReactNode;
  name: string;
  className?: Partial<typeof DRAGGABLE_STYLES.slots>;
  onDragStart?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
};
