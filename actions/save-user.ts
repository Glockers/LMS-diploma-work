import { Server } from '@/lib/axios';
import { Prisma } from '@prisma/client';
import { AxiosResponse } from 'axios';

export async function saveUser(user: Prisma.UserCreateInput) {
  return await Server.post<
    Prisma.UserCreateInput,
    AxiosResponse<boolean>,
    Prisma.UserCreateInput
  >(`/user`, { ...user });
}
