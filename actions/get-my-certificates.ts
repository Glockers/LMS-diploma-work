import { CertificateWithCourse } from '@/entities/certificate';
import { Server } from '@/lib/axios';

export async function getMyCertificates(
  userId: string
): Promise<CertificateWithCourse[]> {
  const result = await Server.get<CertificateWithCourse[]>(
    `/certificate?userId=${userId}`
  );
  return result.data;
}
