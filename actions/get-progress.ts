import { Server } from '@/lib/axios';

export interface ProgressUser {
  theoryResult: number;
  testResult: number;
  resultProgress: number;
}

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<ProgressUser | null> => {
  try {
    const result = await Server.get<ProgressUser>(`/chapter/progress`, {
      params: {
        userId,
        courseId
      }
    });

    return result.data;
  } catch (error) {
    console.error('[GET_PROGRESS]', error);
    return null;
  }
};
