import { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => renderItem(item))}
      </div>

      {items.length === 0 && (
        <div className="mt-10 text-sm text-center text-muted-foreground">
          Пусто
        </div>
      )}
    </div>
  );
}
