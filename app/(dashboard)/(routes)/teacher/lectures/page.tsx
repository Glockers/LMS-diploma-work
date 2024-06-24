import { Server } from '@/lib/axios';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

export default async function LecturesPage() {
  const lectures = await Server.get('/lecture/all');

  return (
    <div className="p-6">
      <DataTable columns={columns} data={lectures.data} />
    </div>
  );
}
