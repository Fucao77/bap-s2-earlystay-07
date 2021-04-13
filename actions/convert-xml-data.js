import { convertCeto } from '../utils/database/convert-ceto';
import { convertXft } from '../utils/database/convert-xft';
import { PrismaClient } from '@prisma/client';

export default async function convertXmlData() {
  const prisma = new PrismaClient();

  try {
    const cetoFile = await (
      await fetch('http://localhost:3000/data/ceto.xml')
    ).text();
    const { productCodes } = await convertCeto(prisma, cetoFile);

    const xftFile = await (
      await fetch('http://localhost:3000/data/xftcpdstandard.xml')
    ).text();
    await convertXft(prisma, xftFile, productCodes);
  } catch (e) {
    console.error(e);
  }

  await prisma.$disconnect();
}
