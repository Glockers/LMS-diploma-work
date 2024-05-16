import { getMyCertificates } from '@/actions/get-my-certificates';
import { CertificateCard } from '@/components/certificate-card';
import { List } from '@/components/list';
import { CertificateWithCourse } from '@/entities/certificate';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const renderCustomItem = (item: CertificateWithCourse) => {
  return <CertificateCard item={item} />;
};

export default async function Certifications() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }
  let certificates: CertificateWithCourse[] = [];

  try {
    certificates = await getMyCertificates(userId);
  } catch {
    toast.error('Произошла ошибка на сервере');
  }

  return (
    <div className="p-6 space-y-4">
      <List<CertificateWithCourse>
        items={certificates}
        renderItem={renderCustomItem}
      />
    </div>
  );
}
