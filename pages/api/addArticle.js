import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { ManagerValidator } from '../../utility/inputValidator/validator';

export default async function addArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(404);
  }

  const body = req.body;

  const prisma = new PrismaClient();

  const author = await prisma.users.findFirst();
  const createdDate = new Date();
  const slug = slugify(body.title, {
    replacement: '-',
    lower: true,
  });

  const content = new ManagerValidator(body);

  content
    .isString('title')
    .isString('description')
    .isString('content')
    .isString('miniature')
    .isRange('title', 3, 40)
    .isRange('description', 5, 100)
    .isRange('content', 30, 10000)
    .isImage('miniature');

  console.log(content.isValid);

  if (content.isValid) {
    prisma.articles
      .create({
        data: {
          ...body,
          author: {
            connect: {
              id: author.id,
            },
          },
          created_at: createdDate,
          slug,
        },
      })
      .then(() => {
        console.log(res);
        res.json({ message: 'Creation is ok' });
      })

      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: 'Le titre existe déjà ' });
      });
  } else {
    res.status(400).json(content.errors);
  }

  prisma.$disconnect();
}
