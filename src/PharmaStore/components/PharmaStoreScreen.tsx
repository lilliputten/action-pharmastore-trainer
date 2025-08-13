import { ArrowDown } from 'lucide-react';

import { isDev } from '@/config';
import { cn } from '@/lib';

import { boxIds } from '../constants/boxes';
import { cards } from '../constants/cards';
import { PharmaStoreBox } from './PharmaStoreBox';
import { PharmaStoreCard } from './PharmaStoreCard';

export function PharmaStoreScreen() {
  // Creating top & bottom boxes (TODO: Use memo)
  const halfCount = Math.ceil(boxIds.length / 2);
  const topIds = boxIds.slice(0, halfCount);
  const bottomIds = boxIds.slice(halfCount);

  return (
    <div
      data-testid="__PharmaStoreScreen"
      className={cn(
        isDev && '__PharmaStoreScreen', // DEBUG
        // 'bg-sky-500/20',
        'flex flex-col flex-1',
        'max-w-[50em]',
      )}
    >
      <div
        className={cn(
          isDev && '__PharmaStoreScreen_Top', // DEBUG
          // 'bg-sky-500/5',
          'flex gap-2 items-center',
          'min-h-32',
        )}
      >
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Cards', // DEBUG
            'flex flex-5 flex-col items-center flex-1 gap-2 p-2',
          )}
        >
          <PharmaStoreCard card={cards[3]} shadows={2} />
        </div>
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Entrance', // DEBUG
            'flex flex-col items-center gap-2 p-2',
            'min-w-40',
          )}
        >
          <div>Приёмочная</div>
          <ArrowDown className={cn('size-5')} />
        </div>
      </div>
      <div
        className={cn(
          isDev && '__PharmaStoreScreen_Main', // DEBUG
          'bg-sky-500/20',
          'flex flex-col gap-2',
          'items-start',
        )}
      >
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Main_Group', // DEBUG
            'flex flex-col gap-2 p-2',
          )}
        >
          <div
            className={cn(
              isDev && '__PharmaStoreScreen_Main_Top', // DEBUG
              'flex gap-2 w-full',
            )}
          >
            {topIds.map((id) => (
              <PharmaStoreBox key={id} id={id} />
            ))}
          </div>
          <div
            className={cn(
              isDev && '__PharmaStoreScreen_Main_Middle', // DEBUG
              'flex gap-2 justify-center my-2 w-full',
            )}
          >
            Помещения или зоны в едином блоке хранения лекарств
          </div>
          <div
            className={cn(
              isDev && '__PharmaStoreScreen_Main_Bottom', // DEBUG
              'flex gap-2 w-full',
            )}
          >
            {bottomIds.map((id) => (
              <PharmaStoreBox key={id} id={id} bottom />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
