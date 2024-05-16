import { CertificateWithCourse } from '@/entities/certificate';
import Image from 'next/image';
import { DownloadCertificate } from './download-certificate';

export interface CertificateCardProps {
  item: CertificateWithCourse;
}

export function formatDate(inputDate: Date): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function CertificateCard({ item }: CertificateCardProps) {
  return (
    <div
      key={item.id}
      className="h-full p-3 overflow-hidden transition border rounded-lg group hover:shadow-sm"
    >
      <div className="relative w-full overflow-hidden rounded-md aspect-video">
        <Image
          fill
          alt={item.id}
          src={item.course.imageUrl || ''} // TODO
          className="object-cover"
        />
      </div>

      <div className="flex flex-col pt-2">
        <div className="text-lg font-medium transition md:text-base group-hover:text-sky-700 line-clamp-2">
          {item.course.title}
        </div>

        <p className="text-xs text-muted-foreground">
          Дата окончания: {formatDate(item.createdAt)}
        </p>

        <DownloadCertificate item={item} />
      </div>
    </div>
  );
}
