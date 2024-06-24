'use client';

import { usePathname } from 'next/navigation';
import {
  Layout,
  Compass,
  Search,
  List,
  BarChart,
  Presentation,
  Ticket,
  Monitor,
  User
} from 'lucide-react';

import { SidebarItem } from './sidebar-item';

const guestRoutes = [
  {
    icon: Layout,
    label: 'Мои курсы',
    href: '/'
  },
  {
    icon: Compass,
    label: 'Поиск',
    href: '/search'
  },
  {
    icon: Ticket,
    label: 'Cертификаты',
    href: '/certifications'
  },
  {
    icon: Monitor,
    label: 'Лекции',
    href: '/lections'
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: 'Курсы',
    href: '/teacher/courses'
  },
  {
    icon: BarChart,
    label: 'Аналитика',
    href: '/teacher/analytics'
  },
  {
    icon: User,
    label: 'Пользователи',
    href: 'https://dashboard.clerk.com/apps/app_2fflEw8rK2IAHe0vnKhVbgEf7ld/instances/ins_2fflEwC15vOQLvFIAkOxSluUDDm/users'
  },
  {
    icon: Presentation,
    label: 'Лекции',
    href: '/teacher/lectures'
  },
  {
    icon: Presentation,
    label: 'Сертификаты',
    href: '/teacher/certifications'
  }
];

export const SidebarRoutes = () => {
  const path = usePathname();

  const isTeacherPage = path?.includes('/teacher');

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
};
