import { Server } from '@/lib/axios';
import { User } from '@prisma/client';

export async function isExistUser(userId: string) {
  return await Server.get<boolean>(`/user/exist/${userId}`);
}

export async function getUserById(userID: string) {
  return await Server.get<User>(`user/${userID}`);
}
