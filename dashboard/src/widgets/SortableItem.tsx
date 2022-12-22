import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Item, { ItemProps } from './Item';

const SortableItem: FC<ItemProps> = (props) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
  };

  return <Item ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />;
};

export default SortableItem;
