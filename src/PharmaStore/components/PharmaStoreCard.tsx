import React from 'react';
import { DraggableAttributes, UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
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

interface TPharmaStoreCardProps {
  card: TCardData;
  shadows?: number;
  dragId?: UniqueIdentifier;
  isDropped: boolean;
  isDroppedCorrect: boolean;
  showAnimation?: boolean;
}

interface TPharmaStoreCardCoreProps extends TPharmaStoreCardProps {
  className?: string;
  innerClassName?: string;
  textClassName?: string;
  setNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  style?: React.CSSProperties;
}

export function PharmaStoreCardCore(props: TPharmaStoreCardCoreProps) {
  const {
    card,
    dragId,
    isDropped,
    isDroppedCorrect,
    className,
    innerClassName,
    textClassName,
    showAnimation,
    setNodeRef,
    listeners,
    attributes,
    style,
  } = props;
  const text = card?.text;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={cn(
        isDev && '__PharmaStoreCardFrame', // DEBUG
        'relative',
        'bg-(--backgroundColor)',
        'flex items-center justify-center',
        'cursor-grab',
        'transition-opacity',
        dragId && 'opacity-70',
        'z-1',
        cardGeometryClassName,
        className,
      )}
    >
      <PharmaStoreCardShadow
        className={cn(isDropped && 'bg-white')}
        innerClassName={cn(
          'border-[0.2em] border-sky-500/20',
          'transition',
          'bg-sky-500/20',
          !dragId && 'hover:bg-sky-500/25 hover:border-sky-500/50',
          isDropped &&
            (isDroppedCorrect
              ? 'bg-green-500/20 border-green-500/50'
              : 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30 hover:border-red-500/60'),
          showAnimation &&
            'disappear-animation-after after:absolute after:inset-0 after:content-[""] after:bg-blue-500',
          innerClassName,
        )}
      />
      <div
        className={cn(
          isDev && '__PharmaStoreCard_Text', // DEBUG
          'text-center m-2',
          'overflow-hidden text-ellipsis',
          'pointer-events-none',
          'z-1 select-none',
          textClassName,
        )}
      >
        {text}
      </div>
    </div>
  );
}

export function PharmaStoreCard(props: TPharmaStoreCardProps) {
  const { card, shadows, isDropped, isDroppedCorrect } = props;
  // dnd
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `PharmaStoreCard`,
    data: card,
  });
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
      <PharmaStoreCardCore
        {...props}
        attributes={attributes}
        listeners={listeners}
        setNodeRef={setNodeRef}
        style={{ transform: CSS.Translate.toString(transform) }}
        className={cn(
          isDropped && !isDroppedCorrect && 'not-hover:animate-pulse',
          isDroppedCorrect && 'pointer-events-none',
        )}
      />
    </div>
  );
}
