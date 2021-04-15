import { PrismaClient } from '@prisma/client';

export default function addArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(404);
  }

  const body = JSON.parse(req.body);

  const prisma = new PrismaClient();

  prisma.articles
    .create({ data: body })
    .then(() => {
      console.log(res);
      res.send('Creation is ok');
    })

    .catch((e) => {
      console.log(e);
      res.send('Creation has failed');
    });
}
