import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Chapter, Course, UserProgress } from '@prisma/client';

import { db } from '@/lib/db';
import { CourseSidebarItem } from './course-sidebar-item';
import { CourseProgress } from '@/components/course-progress';
import { CourseSidebarTest } from './course-sidebar-test';
import { ProgressUser } from '@/actions/get-progress';

interface CourseSidebarProps {
  progressCount: ProgressUser | null;
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
}

export const CourseSidebar = async ({
  course,
  progressCount
}: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) return redirect('/');
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto border-r shadow-sm select-none">
      <div className="flex flex-col p-8 border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount?.resultProgress || 0}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            id={chapter.id}
            key={chapter.id}
            courseId={course.id}
            label={chapter.title}
            isLocked={!chapter.isFree && !purchase}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
          />
        ))}
        <CourseSidebarTest
          id={''}
          label={'Тест'}
          courseId={course.id}
          isLocked={progressCount?.theoryResult !== 100}
          isCompleted={Boolean(progressCount?.testResult)}
        />
      </div>
    </div>
  );
};
