'use client';

import Link from 'next/link';
import { Course } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Trash, X, Pencil } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { Server } from '@/lib/axios';
import toast from 'react-hot-toast';

function formatDate(inputDate: Date): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Идентификатор лекции
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'userId',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Индентификатор преподавателя
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Наименование лекции
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'link',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ссылка на лекцию
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      const link = row.getValue<string>('link');

      return (
        <Link className="" href={link}>
          <Button>Перейти</Button>
        </Link>
      );
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата начала
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>('date') || false;
      return <div>{formatDate(new Date(date))}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      async function deleteLecture() {
        try {
          await Server.delete(`/lecture/${id}`);
          toast.success('Лекция отменена!');
        } catch (err) {
          toast.error('Ошибка при отмене лекции');
          console.log('[LECTIONS] ' + err);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <div>
              <button onClick={deleteLecture}>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash className="w-4 h-4 mr-2" />
                  Удалить
                </DropdownMenuItem>
              </button>
            </div>
            <button onClick={deleteLecture}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" />
                Изменить
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
