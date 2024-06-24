import { auth } from '@clerk/nextjs/server';
import { DataTable } from './_components/data-table';
import { redirect } from 'next/navigation';
import { columns } from './_components/columns';
import { Server } from '@/lib/axios';
import { Prisma } from '@prisma/client';

export default async function CertificationPage() {
  const { userId } = auth();

  if (!userId) return redirect('/');

  const lectures = (
    await Server.get<Prisma.CertificateCreateArgs>('/certificate/all')
  ).data;

  return (
    <div className="p-6">
      <DataTable columns={columns} data={lectures as any} />
    </div>
  );
}
