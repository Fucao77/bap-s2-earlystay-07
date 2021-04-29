import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { ManagerValidator } from '../../utility/inputValidator/validator';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function addArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(404);
  }

  const prisma = new PrismaClient();
  const author = await prisma.users.findFirst();

  try {
    const form = new formidable.IncomingForm();

    // save image in folder

    form.uploadDir = './public/upload-image/article-image';
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      const newImageName = files.miniature.path.substr(34);

      const createdDate = new Date();

      const slug = slugify(fields.title, {
        replacement: '-',
        lower: true,
      });

      const content = new ManagerValidator(fields);

      content
        .isString('title')
        .isString('description')
        .isString('content')
        .isRange('title', 3, 40)
        .isRange('description', 5, 100)
        .isRange('content', 30, 10000);

      if (content.isValid) {
        prisma.articles
          .create({
            data: {
              title: fields.title,
              description: fields.description,
              content: fields.content,
              author: {
                connect: {
                  id: author.id,
                },
              },
              created_at: createdDate,
              miniature: newImageName,
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
    });
  } catch (e) {
    console.log(e);
  }
  prisma.$disconnect();
}
