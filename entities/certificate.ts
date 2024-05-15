import { Prisma } from '@prisma/client';

const certificateWithCourse = Prisma.validator<Prisma.CertificateDefaultArgs>()(
  {
    include: {
      course: true
    }
  }
);

export type CertificateWithCourse = Prisma.CertificateGetPayload<
  typeof certificateWithCourse
>;
