import { List } from '@/components/list';
import { Server } from '@/lib/axios';
import { LectureCard } from './_components/lecture-card';

const renderCustomItem = (item: any) => {
  return <LectureCard item={item} />;
};

export default async function LectionsPage() {
  const lectures = await Server.get('/lecture/all');

  return (
    <div className="p-6 space-y-4">
      <List<any> items={lectures.data as any} renderItem={renderCustomItem} />
    </div>
  );
}
