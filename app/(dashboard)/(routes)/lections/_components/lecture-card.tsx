import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function formatDate(inputDate: Date): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function dateToTime(date: Date): string {
  date = new Date(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Форматируем время в строку в формате "HH:MM"
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  return `${hoursString}:${minutesString}`;
}

export function LectureCard({ item }: any) {
  return (
    <div
      key={item.id}
      className="h-full p-3 overflow-hidden transition border rounded-lg group hover:shadow-sm"
    >
      <div className="flex flex-col pt-2">
        <div className="text-lg font-medium transition md:text-base group-hover:text-sky-700 line-clamp-2">
          {item.title}
        </div>

        <div className="mt-10 mb-10 text-lg font-medium transition md:text-base group-hover:text-sky-700 line-clamp-2">
          Дата начала: {formatDate(item.date)} {dateToTime(item.time)}
        </div>

        <Link href={item.link}>
          <Button>Перейти</Button>
        </Link>
      </div>
    </div>
  );
}
