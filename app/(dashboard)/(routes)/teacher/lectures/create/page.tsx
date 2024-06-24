import { auth } from '@clerk/nextjs/server';
import { LectureCreate } from './_components/create';
import { redirect } from 'next/navigation';

export default function LectureCreatePage() {
  const { userId } = auth();

  if (!userId) redirect('/');

  return <LectureCreate userId={userId} />;
}
