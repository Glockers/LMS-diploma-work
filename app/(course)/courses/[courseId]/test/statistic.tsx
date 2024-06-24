'use client';
import { LucideLayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import React, { useEffect } from 'react';
import ResultsCard from './_components/ResultsCard';
import TimeTakenCard from './_components/TimeTakenCard';
import AccuracyCard from './_components/AccuracyCard';
import { buttonVariants } from '@/components/ui/button';
import { getUserProgressTest } from '@/actions/get-user-progress';

type Props = {
  progress: any;
  testFunc?: () => {};
};

export function Statistics({ progress }: Props) {
  const [accuracy, setAccuracy] = React.useState(0);

  useEffect(() => {
    async function fetch() {
      const res = await getUserProgressTest(progress.userId, progress.courseId);
      console.log(res.data);
      setAccuracy(res.data.correctAnswers * 10);
    }
    fetch();
  }, []);

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/certifications" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Получить сертификат
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(progress.timeEnd)}
            timeStarted={new Date(progress.timeStart)}
          />
        </div>
        {/* <QuestionsList questions={game.questions} /> */}
      </div>
    </>
  );
}
