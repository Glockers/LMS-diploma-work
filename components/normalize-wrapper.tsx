import { ReactNode } from 'react';

export function NormalizeWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}
