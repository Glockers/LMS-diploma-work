'use client';

import Link from 'next/link';
import { Course } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Trash, X } from 'lucide-react';

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
            Номер сертификата
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
            Пользователь
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
    accessorKey: 'course.title',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Название курса
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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата прохождения
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
      const date = row.getValue<Date>('createdAt') || false;

      return <div>{formatDate(date)}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      async function deleteCertificate() {
        try {
          await Server.delete(`/certificate/${id}`);
          toast.success('Cертификат удален');
        } catch (err) {
          toast.error('Cертификат не удален');
          console.log('[CERTIFICATE] ' + err);
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
            <button onClick={deleteCertificate}>
              <DropdownMenuItem className="cursor-pointer">
                <Trash className="w-4 h-4 mr-2" />
                Удалить
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
