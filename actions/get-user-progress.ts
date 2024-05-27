import { Server } from '@/lib/axios';

export async function getUserProgressTest(userId: string, courseId: string) {
  return await Server.get(`/chapter/get-test-progress`, {
    params: {
      userId,
      courseId
    }
  });
}
