'use client';
import { Button } from './ui/button';
import { usePDF } from 'react-to-pdf';
import toast from 'react-hot-toast';
import { CertificateCardProps, formatDate } from './certificate-card';
import { useEffect, useState } from 'react';
import { getUserById } from '@/actions/get-user';

export function DownloadCertificate({ item }: CertificateCardProps) {
  const { toPDF, targetRef } = usePDF({ filename: 'certificate.pdf' });
  const [fio, setFio] = useState('');

  const generatePDF = async () => {
    toPDF();
    toast.success('Сертификат скачен');
  };

  useEffect(() => {
    const fetchData = async () => {
      return (await getUserById(item.userId)).data;
    };

    fetchData().then((res) => {
      setFio(`${res.name} ${res.lastname} ${res.surname}`);
    });
  }, [item.userId]);

  return (
    <>
      <div
        ref={targetRef}
        className="bg-white border border-gray-300 rounded-lg shadow-md p-8 mt-5"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
          <p className="text-gray-600 mb-4">Awarded to</p>
          <h3 className="text-3xl font-bold mb-4">{fio}</h3>
          <p className="text-gray-600 mb-4">For successfully completing the</p>
          <h4 className="text-2xl font-bold mb-4">{item.course.title}</h4>
          <p className="text-gray-600 mb-4">On</p>
          <p className="text-gray-600 mb-6">{formatDate(item.createdAt)}</p>
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
            </svg>
            <p className="text-gray-600">{item.id}</p>
          </div>
        </div>
      </div>

      <Button onClick={generatePDF} className="p-5 mt-4">
        Скачать сертификат
      </Button>
    </>
  );
}
