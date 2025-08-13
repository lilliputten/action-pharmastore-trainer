import { ArrowUp } from 'lucide-react';

import { isDev } from '@/config';
import { cn } from '@/lib';

import { boxes, TBoxId } from '../constants/boxes';

interface TProps {
  id: TBoxId;
  bottom?: boolean;
}

export function PharmaStoreBox(props: TProps) {
  const { id, bottom: isBottom } = props;
  const isTop = !isBottom;
  const boxData = boxes[id];
  const { title } = boxData;
  return (
    <div
      id={id}
      data-testid="__PharmaStoreBox"
      data-bottom={isBottom}
      className={cn(
        isDev && '__PharmaStoreBox', // DEBUG
        'relative',
        'bg-sky-500/10',
        'flex items-center justify-center',
        'size-[8em]',
        'min-size-[8em]',
        'border border-[0.4em] border-white/40',
        isTop && 'mb-10',
        isBottom && 'mt-10',
      )}
    >
      <div
        className={cn(
          isDev && '__PharmaStoreBox_Text', // DEBUG
          'text-center',
          // 'truncate',
          'overflow-hidden text-ellipsis',
          'm-1',
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
  );
}
