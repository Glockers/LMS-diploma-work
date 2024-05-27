import { auth } from '@clerk/nextjs/server';
import { Test } from './test-page';
import { redirect } from 'next/navigation';
import { Server } from '@/lib/axios';
import { getUserProgressTest } from '@/actions/get-user-progress';

type Props = {
  params: {
    courseId: string;
  };
};

const countQuestion = 10;

async function getCourse(courseId: string) {
  const res = await Server.get(`/course/${courseId}`);

  if (!res.data) {
    throw new Error('Failed to fetch data');
  }

  return res.data;
}

async function getQuestions(courseId: string, variantsCount: number) {
  const res = await Server.get(`/test/questions`, {
    params: {
      courseId,
      variantsCount
    }
  });

  if (!res.data) {
    throw new Error('Failed to fetch data');
  }

  return res.data;
}

export default async function TestPage({ params: { courseId } }: Props) {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const course = await getCourse(courseId);
  const passedTest = await getUserProgressTest(userId, courseId);
  const questions = await getQuestions(courseId, countQuestion);

  console.log(questions);

  const testOptions = {
    timeStart: new Date(),
    course: course,
    passedTest: passedTest.data,
    isCompleted: Boolean(passedTest.data),
    userId
  };

  return <Test testOptions={testOptions} questions={questions} />;
}
