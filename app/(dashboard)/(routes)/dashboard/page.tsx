import { auth } from '@clerk/nextjs/server';
import FormProfile from './components/form';
import { redirect } from 'next/navigation';
import { isExistUser } from '@/actions/is-exist-user';

async function isUserExist(userID: string) {
  return await isExistUser(userID);
}

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) return redirect('/');

  const isExist = (await isUserExist(userId)).data;

  return (
    <div className="p-6 space-y-4">
      {isExist ? redirect('/') : <FormProfile userId={userId} />}
    </div>
  );
}
