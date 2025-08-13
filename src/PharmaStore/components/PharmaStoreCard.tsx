import { isDev } from '@/config';
import { cn } from '@/lib';
import { TPropsWithChildrenAndClassName, TPropsWithClassName } from '@/types/react';

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

export function PharmaStoreCardFrame(props: TPropsWithChildrenAndClassName) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        isDev && '__PharmaStoreCardFrame', // DEBUG
        'relative',
        'bg-(--backgroundColor)',
        'flex items-center justify-center',
        cardGeometryClassName,
        className,
      )}
    >
      <PharmaStoreCardShadow
        innerClassName={cn(
          'border-[0.2em] border-sky-800/20',
          'transition',
          'hover:bg-sky-500/30',
          'hover:border-sky-800/50',
        )}
      />
      {children}
    </div>
  );
}

interface TProps {
  card: TCardData;
  shadows?: number;
}

export function PharmaStoreCard(props: TProps) {
  const { card, shadows } = props;
  const { text } = card;
  return (
    <div
      data-testid="__PharmaStoreCard"
      className={cn(
        isDev && '__PharmaStoreCard', // DEBUG
        'relative',
        'cursor-grab',
        cardGeometryClassName,
      )}
    >
      {!!shadows && (
        <>
          {shadows > 1 && (
            <PharmaStoreCardShadow
              className="top-[0.6em] left-[0.6em]"
              innerClassName="opacity-40"
            />
          )}
          <PharmaStoreCardShadow className="top-[0.3em] left-[0.3em]" innerClassName="opacity-70" />
        </>
      )}
      <PharmaStoreCardFrame>
        <div
          className={cn(
            isDev && '__PharmaStoreCard_Text', // DEBUG
            'text-center m-2',
            // 'truncate',
            'overflow-hidden text-ellipsis',
            'pointer-events-none',
            'z-1',
          )}
        >
          {text}
        </div>
      </PharmaStoreCardFrame>
    </div>
  );
}
