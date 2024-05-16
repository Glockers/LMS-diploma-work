import { Server } from '@/lib/axios';

export async function isExistUser(userId: string) {
  return await Server.get<boolean>(`/user/exist/${userId}`);
}
