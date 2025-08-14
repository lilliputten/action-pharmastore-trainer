import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ArrowDown } from 'lucide-react';

import { ProgressNav } from '@/components/ProgressNav';
import { isDev } from '@/config';
import { cn } from '@/lib';

import { boxIds, TBoxId } from '../constants/boxes';
import { cards, TCardData } from '../constants/cards';
import { PharmaStoreBox } from './PharmaStoreBox';
import { PharmaStoreCard } from './PharmaStoreCard';

const animationDuration = 2000;
const nextStepDelay = 1000;

export function PharmaStoreScreen() {
  const [step, setStep] = React.useState(isDev ? 10 : 0);
  const stepsCount = cards.length;
  const restSteps = stepsCount - step - 1;
  const isFinished = restSteps < 0;
  const cardData = cards[step];

  // Creating top & bottom boxes (TODO: Use memo)
  const halfBoxesCount = Math.ceil(boxIds.length / 2);
  const topIds = boxIds.slice(0, halfBoxesCount);
  const bottomIds = boxIds.slice(halfBoxesCount);

  const [showAnimation, setShowAnimation] = React.useState(false);
  const [dragId, setDragId] = React.useState<UniqueIdentifier | undefined>();
  const [droppedBox, setDroppedBox] = React.useState<TBoxId | undefined>();
  const isDropped = !!droppedBox;
  const isDroppedCorrect = isDropped && cardData?.box === droppedBox;

  React.useEffect(() => {
    setDroppedBox(undefined);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), animationDuration);
  }, [step, isFinished]);

  const onDragStart = ({ active }: DragStartEvent) => {
    setDragId(active.id);
  };
  const onDragCancel = () => {
    setDragId(undefined);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const boxId = over?.id as TBoxId | undefined;
    const cardData = active.data.current as TCardData | undefined;
    const isCorrect = cardData?.box === boxId;
    if (boxId) {
      setDroppedBox(boxId);
    }
    setDragId(undefined);
    if (isCorrect) {
      setTimeout(() => {
        setStep((step) => step + 1);
      }, nextStepDelay);
    }
  };

  const sensors = useSensors(
    // Sortable sensors list (only for mouse pointer and touch devices so far)
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      autoScroll={false}
    >
      <div
        data-testid="__PharmaStoreScreen"
        className={cn(
          isDev && '__PharmaStoreScreen', // DEBUG
          'flex flex-col flex-1',
          'max-w-[50em]',
          'relative',
          'pb-20',
        )}
      >
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Top', // DEBUG
            'flex gap-2 items-center',
            'min-h-32',
            'transition duration-500',
            isFinished && 'opacity-0 pointer-events-none',
          )}
        >
          <div
            className={cn(
              isDev && '__PharmaStoreScreen_Cards', // DEBUG
              'flex flex-5 flex-col items-center gap-2 p-2',
            )}
          >
            {!isFinished && (
              <PharmaStoreCard
                card={cardData}
                shadows={restSteps}
                dragId={dragId}
                isDropped={isDropped}
                isDroppedCorrect={isDroppedCorrect}
                showAnimation={showAnimation}
              />
            )}
          </div>
          <div
            className={cn(
              isDev && '__PharmaStoreScreen_Entrance', // DEBUG
              'flex flex-col items-center gap-2 p-2',
              'min-w-40 select-none',
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
            'flex flex-col gap-2 items-start',
            'transition duration-500',
            isFinished && 'opacity-0 pointer-events-none',
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
                <PharmaStoreBox
                  key={id}
                  id={id}
                  card={cardData}
                  isDropped={isDropped}
                  isDroppedHere={droppedBox === id}
                  isDroppedCorrect={isDroppedCorrect}
                  dragId={dragId}
                />
              ))}
            </div>
            <div
              className={cn(
                isDev && '__PharmaStoreScreen_Main_Middle', // DEBUG
                'flex gap-2 justify-center my-2 w-full select-none',
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
                <PharmaStoreBox
                  key={id}
                  id={id}
                  card={cardData}
                  isDropped={isDropped}
                  isDroppedHere={droppedBox === id}
                  isDroppedCorrect={isDroppedCorrect}
                  dragId={dragId}
                  isBottom
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={cn(
            isDev && '__PharmaStoreScreen_Finished_Splash', // DEBUG
            'bg-(--backgroundColor)',
            'absolute inset-0 flex flex-col flex-1 gap-4 items-center justify-center z-1',
            'select-none',
            'transition duration-500',
            !isFinished && 'opacity-0 pointer-events-none',
          )}
        >
          <h1 className="text-slate-500 font-medium text-center text-5xl leading-[1.3em] p-4 pb-10">Вы справились с заданием и распределили все препараты по нужным зонам</h1>
          {/* // TODO: Button
          <div
            className={cn(
              isDev && '__ProgressNav_NavIcon', // DEBUG
              'flex items-center justify-center',
              // 'size-[2em]',
              'bg-green-500 text-white',
              'rounded-full shadow-lg/30',
              'transition',
              'cursor-pointer',
              'p-2',
            )}
            // title={title}
            // onClick={onClick}
          >
            Начать заново
          </div>
          */}
        </div>
        <ProgressNav
          step={step}
          stepsCount={stepsCount}
          setFirstStep={() => setStep(0)}
          setPrevStep={() => setStep((step) => step - 1)}
        />
      </div>
    </DndContext>
  );
}
