import { PrismaClient } from '.prisma/client';
import { convertCeto } from '../../actions/convert-ceto';
import { convertXft } from '../../actions/convert-xft';

export default (req, res) => {
  const prisma = new PrismaClient();

  fetch('http://localhost:3000/data/ceto.xml')
    .then((res) => res.text())
    .then(async (cetoRes) => {
      const { productCodes } = await convertCeto(prisma, cetoRes);

      fetch('http://localhost:3000/data/xftcpdstandard.xml')
        .then((res) => res.text())
        .then(async (xftData) => {
          const data = await convertXft(prisma, xftData, productCodes);
          await prisma.$disconnect();
          res.status(200).json(data);
        });
    });
};
