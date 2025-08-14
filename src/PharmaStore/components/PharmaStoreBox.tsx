import { UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp } from 'lucide-react';

import { isDev } from '@/config';
import { cn } from '@/lib';

import { boxes, TBoxId } from '../constants/boxes';
import { TCardData } from '../constants/cards';
import { PharmaStoreCardCore } from './PharmaStoreCard';

interface TProps {
  id: TBoxId;
  card: TCardData;
  isBottom?: boolean;
  isDropped: boolean;
  isDroppedHere: boolean;
  isDroppedCorrect: boolean;
  dragId?: UniqueIdentifier;
}

const boxGeometryClassName = 'size-[8em] min-size-[8em]';

const __showCorrectBox = true;

export function PharmaStoreBox(props: TProps) {
  const { id, card, isBottom, isDropped, isDroppedHere, isDroppedCorrect, dragId } = props;
  const isTop = !isBottom;
  const boxData = boxes[id];
  const { title } = boxData;
  // dnd
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({ id, data: boxData });
  const isCorrectBox = card?.box === id;
  const isDraggable = isDropped && isDroppedHere && !isDroppedCorrect;
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
  } = useDraggable({
    id: `PharmaStoreBox-${id}`,
    data: card,
  });
  const draggableProps = isDraggable
    ? {
        ...listeners,
        ...attributes,
        ref: setDraggableRef,
        style: { transform: CSS.Translate.toString(transform) },
      }
    : undefined;
  return (
    <div
      data-testid="__PharmaStoreBox_Wrapper"
      data-bottom={isBottom}
      className={cn(
        isDev && '__PharmaStoreBox_Wrapper', // DEBUG
        'relative',
      )}
    >
      {isDraggable && (
        <div
          className={cn(
            isDev && '__PharmaStoreBox_Draggable', // DEBUG
            'absolute',
            'top-0 left-0',
            boxGeometryClassName,
            'flex items-center justify-center',
            'border-[0.4em] border-transparent',
            'cursor-grab',
            'z-2',
            isBottom && 'mt-10',
          )}
          {...draggableProps}
        >
          <PharmaStoreCardCore
            {...props}
            card={card}
            className={cn(
              'absolute',
              (!dragId || dragId === 'PharmaStoreCard') && 'opacity-0 pointer-events-none',
            )}
          />
        </div>
      )}
      <div
        id={id}
        ref={setDroppableRef}
        data-testid="__PharmaStoreBox"
        data-bottom={isBottom}
        className={cn(
          isDev && '__PharmaStoreBox', // DEBUG
          'relative transition',
          boxGeometryClassName,
          'bg-sky-500/10',
          'flex items-center justify-center',
          'border-[0.4em] border-white/40',
          'transition',
          isDroppedHere &&
            (isDroppedCorrect
              ? 'bg-green-500/10 border-green-500'
              : 'bg-red-500/10 border-red-500'),
          isOver &&
            (isDev && __showCorrectBox
              ? isCorrectBox
                ? 'border-green-500/50'
                : 'border-red-500/50'
              : 'border-sky-500/50'),
          isDraggable && 'cursor-grab',
          isTop && 'mb-10',
          isBottom && 'mt-10',
        )}
      >
        <div
          className={cn(
            isDev && '__PharmaStoreBox_Text', // DEBUG
            'text-center m-1',
            'overflow-hidden text-ellipsis select-none',
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            isDev && '__PharmaStoreBox_Door', // DEBUG
            'absolute',
            'w-[2.5em] h-[0.8em]',
            'bg-sky-100',
            isTop && 'bottom-[-0.6em]',
            isBottom && 'top-[-0.6em]',
          )}
        />
        <ArrowUp
          className={cn(
            isDev && '__PharmaStoreBox_Arrow', // DEBUG
            'absolute',
            'size-5',
            isTop && 'bottom-[-2.5em]',
            isBottom && 'top-[-2.5em]',
            isBottom && 'rotate-180',
          )}
        />
      </div>
    </div>
  );
}

export function PharmaStoreBoxDroppbale(props: TProps) {
  return <PharmaStoreBox {...props} />;
}

export function PharmaStoreBoxDraggable(props: TProps) {
  return <PharmaStoreBox {...props} />;
}

export function PharmaStoreBoxDropped(props: TProps) {
  const { isDropped, isDroppedHere, isDroppedCorrect } = props;
  const Component =
    !isDropped || isDroppedCorrect
      ? PharmaStoreBox
      : isDroppedHere
        ? PharmaStoreBoxDraggable
        : PharmaStoreBoxDroppbale;
  return <Component {...props} />;
}
