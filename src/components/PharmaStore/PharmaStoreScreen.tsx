import { isDev } from '@/config';
import { cn } from '@/lib';

export function PharmaStoreScreen() {
  return (
    <div
      className={cn(
        isDev && '__PharmaStore', // DEBUG
      )}
    >
      PharmaStoreScreen
    </div>
  );
}
