import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: any;
  children: ReactNode;
}

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    display: 'inline-block',  // Added display property
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}