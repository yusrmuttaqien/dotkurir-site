'use client';

import { useRef, type MouseEvent } from 'react';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import type { DraggableProps } from './type';

export const DRAGGABLE_STYLES = tv({
  slots: {
    wrapper: '',
    dragger: 'w-max cursor-grab',
    container: 'w-full overflow-hidden',
  },
});

export default function Draggable(props: DraggableProps) {
  const { children, className, name, onDragStart, onDragEnd } = props;
  const scope = useRef<HTMLDivElement>(null);
  const states = useRef({
    mouseHold: false,
    mouseRelease: false,
    mouseLeave: false,
  });
  const { wrapper, dragger, container } = DRAGGABLE_STYLES();

  function _cursorGrab(e: MouseEvent) {
    const event = e.type;
    const draggable = document.getElementById(`${name}-draggable`);

    switch (event) {
      case 'mousedown':
        states.current.mouseHold = true;
        draggable?.classList.add('cursor-grabbing');
        break;
      case 'mouseup':
        states.current.mouseRelease = true;
        draggable?.classList.remove('cursor-grabbing');
        break;
      case 'mouseleave':
        states.current.mouseLeave = true;
        break;
      case 'mouseenter':
        if (!states.current.mouseRelease && states.current.mouseLeave) {
          draggable?.classList.remove('cursor-grabbing');
        }

        states.current.mouseHold = false;
        states.current.mouseRelease = false;
        states.current.mouseLeave = false;
        break;
    }
  }

  return (
    <div className={container({ className: className?.container })}>
      <div ref={scope} className={wrapper({ className: className?.wrapper })}>
        <motion.div
          id={`${name}-draggable`}
          drag="x"
          dragConstraints={scope}
          className={dragger({ className: className?.dragger })}
          onMouseDown={_cursorGrab}
          onMouseUp={_cursorGrab}
          onMouseEnter={_cursorGrab}
          onMouseLeave={_cursorGrab}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
