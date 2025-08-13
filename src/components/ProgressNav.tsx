import React from 'react';
import { ChevronLeft, ChevronRight, Info, Maximize, Minimize, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import screenfull from 'screenfull';

import { defaultToastOptions, isDev } from '@/config';
import { cn } from '@/lib';

interface TProgressNavProps {
  canGoForward?: boolean;
  step: number;
  stepsCount: number;
  // Actions
  setFirstStep?: () => void;
  setNextStep?: () => void;
  setPrevStep?: () => void;
  // Can go forward?
  allowedNextStep?: boolean;
}

const helpMessageDelay = 10000; // toastAutoCloseTimeout + 2000;

const helpMessage = 'Расположите товар в соответствующей зоне хранения лекарств.';

interface TMemo {
  timeoutHandler?: ReturnType<typeof setTimeout>;
}

export function ProgressNav(props: TProgressNavProps) {
  const {
    canGoForward,
    setNextStep,
    step,
    stepsCount,
    setPrevStep,
    setFirstStep,
    allowedNextStep = true,
  } = props;
  const isFirstStep = !step;
  const isLastStep = step === stepsCount - 1;
  const [showHelp, setShowHelp] = React.useState(false);

  const memo = React.useMemo<TMemo>(() => ({}), []);

  const [isFullscreen, setFullscreen] = React.useState(false);

  const handleShowHelp = React.useCallback(() => {
    if (memo.timeoutHandler) {
      clearTimeout(memo.timeoutHandler);
    }
    toast.info(helpMessage, { ...defaultToastOptions, autoClose: helpMessageDelay });
    setShowHelp(true);
    memo.timeoutHandler = setTimeout(() => setShowHelp(false), helpMessageDelay);
  }, [memo]);

  React.useEffect(() => {
    handleShowHelp();
  }, [handleShowHelp]);

  React.useEffect(() => {
    if (isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  }, [isFullscreen]);

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  const FullScreenIcon = isFullscreen ? Minimize : Maximize;

  return (
    <div
      className={cn(
        isDev && '__ProgressNav', // DEBUG
        'fixed',
        'select-none',
        'bottom-4 left-4 right-4',
        'h-[3em]',
        'flex items-stretch justify-center gap-2',
      )}
    >
      {!isFirstStep && setPrevStep && (
        <NavIcon
          className={cn(
            isDev && '__ProgressNav_PrevStep', // DEBUG
            'bg-blue-500 hover:bg-blue-600',
          )}
          disabled={isFirstStep}
          title="Предыдущий шаг"
          onClick={setPrevStep}
        >
          <ChevronLeft size="2em" />
        </NavIcon>
      )}
      {!isFirstStep && setFirstStep && (
        <NavIcon
          className={cn(
            isDev && '__ProgressNav_Replay', // DEBUG
            'bg-blue-500 hover:bg-blue-600',
          )}
          title="Начать сначала"
          onClick={setFirstStep}
          disabled={isFirstStep}
        >
          <RotateCcw size="2em" />
        </NavIcon>
      )}
      <NavStatus
        className={cn(
          isDev && '__ProgressNav_Status', // DEBUG
        )}
        step={step}
        stepsCount={stepsCount}
      />
      <NavIcon
        className={cn(
          isDev && '__ProgressNav_Fullscreen', // DEBUG
          'bg-blue-500 hover:bg-blue-600',
        )}
        title="Полноэкранный режим"
        onClick={toggleFullscreen}
      >
        <FullScreenIcon size="2em" />
      </NavIcon>
      <NavIcon
        className={cn(
          isDev && '__ProgressNav_Help', // DEBUG
          'bg-teal-500 hover:bg-teal-600',
        )}
        disabled={!helpMessage || showHelp}
        title="Подсказка"
        onClick={handleShowHelp}
      >
        <Info size="2em" />
      </NavIcon>
      {!isLastStep && setNextStep && (
        <NavIcon
          className={cn(
            isDev && '__ProgressNav_NextStep', // DEBUG
            'bg-blue-500 hover:bg-blue-600',
          )}
          disabled={!canGoForward && !allowedNextStep}
          title="Следующий шаг"
          onClick={setNextStep}
        >
          <ChevronRight size="2em" />
        </NavIcon>
      )}
    </div>
  );
}

interface TIconProps {
  onClick: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  // Icon: React.ForwardRefExoticComponent<LucideProps>;
}

function NavIcon(props: TIconProps) {
  const { onClick, title, className, children, disabled } = props;
  return (
    <div
      className={cn(
        isDev && '__ProgressNav_NavIcon', // DEBUG
        'flex items-center justify-center',
        'size-[2em]',
        'text-white',
        'rounded-full shadow-lg/30',
        'transition',
        'cursor-pointer',
        // 'hover:opacity-80',
        'p-2',
        disabled && 'disabled pointer-events-none opacity-25',
        className,
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface TNavStatusProps {
  className?: string;
  step: number;
  stepsCount: number;
}
function NavStatus(props: TNavStatusProps) {
  const { className, step, stepsCount } = props;
  const stepNo = step + 1;
  const isFinished = stepNo >= stepsCount;
  const text = isFinished ? 'Завершено' : `${stepNo} / ${stepsCount}`;
  return (
    <div
      className={cn(
        isDev && '__ProgressNav_Status', // DEBUG
        'flex items-center justify-center',
        'bg-slate-500 text-white',
        isFinished && 'bg-green-500 uppercase font-bold',
        'rounded-3xl shadow-lg/30',
        'px-6 py-0',
        'truncate',
        className,
      )}
      title={text}
    >
      <div className="truncate">
        {!isFinished && <span className="opacity-50">Шаг: </span>}
        <span className="pl-1">{text}</span>
      </div>
    </div>
  );
}
