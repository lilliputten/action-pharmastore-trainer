import { isDev } from '@/config';
import { cn } from '@/lib';
import { PharmaStoreScreen } from '@/PharmaStore/components/PharmaStoreScreen';

export function PharmaStorePage() {
  // TODO: Add necessary contexts here
  return (
    <div
      className={cn(
        isDev && '__PharmaStorePage', // DEBUG
        'p-4 flex items-center justify-center',
      )}
    >
      {/* The core content */}
      <PharmaStoreScreen />
    </div>
  );
}
