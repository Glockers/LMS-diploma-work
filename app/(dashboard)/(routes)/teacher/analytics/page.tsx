import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Chart } from './_components/chart';
import { DataCard } from './_components/data-card';
import { getAnalytics } from '@/actions/get-analytics';

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const users = await clerkClient.users.getUserList();

  const { totalRevenue, data, totalSales } = await getAnalytics(userId);

  const tests = [
    {
      total: 2,
      name: 'Количество продаж'
    },
    {
      total: 4,
      name: 'Пройдено теоритических материалов'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-10">
        <DataCard value={users.totalCount} label="Количество пользователей" />
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <DataCard shouldFormat value={totalRevenue} label="Сумма продаж" />
          <DataCard value={totalSales} label="Количество продаж" />
        </div>

        <Chart data={data} />
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <DataCard value={totalSales} label="Количество сертификатов" />
          <DataCard value={4} label="Пройдено теоритических материалов" />
        </div>

        <Chart data={tests} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
