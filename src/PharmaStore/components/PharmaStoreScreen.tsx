import React from 'react';
import {
  Active,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ArrowDown } from 'lucide-react';

import { ProgressNav } from '@/components/ProgressNav';
import { isDev } from '@/config';
import { cn } from '@/lib';

import { boxIds, TBoxData, TBoxId } from '../constants/boxes';
import { cards, TCardData } from '../constants/cards';
import { PharmaStoreBox } from './PharmaStoreBox';
import { PharmaStoreCard } from './PharmaStoreCard';

export function PharmaStoreScreen() {
  const [step, setStep] = React.useState(0);
  const stepsCount = cards.length;
  const restSteps = stepsCount - step - 1;

  // Creating top & bottom boxes (TODO: Use memo)
  const halfBoxesCount = Math.ceil(boxIds.length / 2);
  const topIds = boxIds.slice(0, halfBoxesCount);
  const bottomIds = boxIds.slice(halfBoxesCount);

  const [dragActive, setDragActive] = React.useState(false);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const boxId = over?.id as TBoxId | undefined;
    const boxData = over?.data.current as TBoxData | undefined;
    const sourceId = active.id;
    const cardData = active.data.current as TCardData | undefined;
    const isCorrect = cardData?.box === boxId;
    console.log('[PharmaStoreScreen:onDragEnd]', isCorrect, sourceId, '->', boxId, {
      cardData,
      boxData,
      active,
      over,
      event,
    });
    setDragActive(false);
    // TODO: Set box state (correct/incorrect)
  };

  const sensors = useSensors(
    // Sortable sensors list (only for mouse pointer and touch devices so far)
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={() => setDragActive(true)}
      onDragCancel={() => setDragActive(false)}
      onDragEnd={onDragEnd}
    >
      <div
        data-testid="__PharmaStoreScreen"
        className={cn(
          isDev && '__PharmaStoreScreen', // DEBUG
          'flex flex-col flex-1',
          'max-w-[50em]',
        )}
      >
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Top', // DEBUG
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
            <PharmaStoreCard card={cards[step]} shadows={restSteps} dragActive={dragActive} />
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
        <ProgressNav step={step} stepsCount={stepsCount} />
      </div>
    </DndContext>
  );
}
