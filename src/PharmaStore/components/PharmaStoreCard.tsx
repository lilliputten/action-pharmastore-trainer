import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { isDev } from '@/config';
import { cn } from '@/lib';
import { TPropsWithClassName } from '@/types/react';

import { TCardData } from '../constants/cards';

const cardGeometryClassName = 'box-border w-[30em] h-[4em] rounded';

export function PharmaStoreCardShadow(props: TPropsWithClassName & { innerClassName?: string }) {
  const { className, innerClassName } = props;
  return (
    <div
      className={cn(
        isDev && '__PharmaStoreCardShadow', // DEBUG
        'absolute',
        'bg-(--backgroundColor)',
        cardGeometryClassName,
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__PharmaStoreCardShadow_Inner', // DEBUG
          'absolute',
          'bg-sky-500/20',
          cardGeometryClassName,
          innerClassName,
        )}
      />
    </div>
  );
}

interface TProps {
  card: TCardData;
  shadows?: number;
  dragActive?: boolean;
}

export function PharmaStoreCard(props: TProps) {
  const { card, shadows, dragActive } = props;
  const { text } = card;
  // dnd
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'PharmaStoreCard',
    data: card,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      data-testid="__PharmaStoreCard"
      className={cn(
        isDev && '__PharmaStoreCard', // DEBUG
        'relative',
        cardGeometryClassName,
      )}
    >
      {!!shadows && shadows > 2 && (
        <PharmaStoreCardShadow className="top-[0.8em] left-[0.8em]" innerClassName="opacity-20" />
      )}
      {!!shadows && shadows > 1 && (
        <PharmaStoreCardShadow className="top-[0.5em] left-[0.5em]" innerClassName="opacity-50" />
      )}
      {!!shadows && (
        <PharmaStoreCardShadow className="top-[0.2em] left-[0.2em]" innerClassName="opacity-80" />
      )}
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          isDev && '__PharmaStoreCardFrame', // DEBUG
          'relative',
          'bg-(--backgroundColor)',
          // 'bg-white',
          'flex items-center justify-center',
          'cursor-grab',
          'transition-opacity',
          dragActive && 'opacity-50 cursor-grabbing',
          'z-1',
          cardGeometryClassName,
        )}
      >
        <PharmaStoreCardShadow
          innerClassName={cn(
            'border-[0.2em] border-sky-800/20',
            'transition',
            'bg-sky-500/20',
            dragActive && 'bg-sky-500/60',
            !dragActive && 'hover:bg-sky-500/30',
            'hover:border-sky-800/50',
          )}
        />
        <div
          className={cn(
            isDev && '__PharmaStoreCard_Text', // DEBUG
            'text-center m-2',
            'overflow-hidden text-ellipsis',
            'pointer-events-none',
            'z-1',
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
