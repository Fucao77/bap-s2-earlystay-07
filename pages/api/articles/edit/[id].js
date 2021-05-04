import { PrismaClient } from '@prisma/client';
import { ManagerValidator } from '../../../../utils/validator';
import formidable from 'formidable';
import fs from 'fs';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function editArticle(req, res) {
  const session = await getSession({ req });
  console.log(session);
  if (req.method !== 'PUT') {
    return res.status(404);
  }
  const prisma = new PrismaClient();
  const author = await prisma.users.findFirst();

  const id = req.query.id;
  const articles = await prisma.articles.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  try {
    const form = new formidable.IncomingForm();

    //select path upload
    form.uploadDir = './public/upload-image/article-image';
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      let articleMiniature = articles.miniature;
      let newArticleMiniature;

      const pathFile = './public/upload-image/article-image/';

      const content = new ManagerValidator(fields);
      const newDate = new Date();

      content
        .isString('title')
        .isString('description')
        .isString('content')
        .isRange('title', 3, 40)
        .isRange('description', 5, 10000)
        .isRange('content', 30, 10000);

      if (!content.isValid && fields.miniature == 'null') {
        //delete file named articleMiniature
        newArticleMiniature = files.miniature.path.substr(34);
        fs.unlinkSync(pathFile + newArticleMiniature);
      } else if (!content.isValid) {
        res.status(400).json(content.errors);
        return;
      }

      if (content.isValid && !fields.miniature) {
        newArticleMiniature = files.miniature.path.substr(34);
      } else {
        newArticleMiniature = articleMiniature;
      }

      return await prisma.articles
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            title: fields.title,
            description: fields.description,
            content: fields.content,
            author_id: author.id,
            created_at: newDate,
            miniature: newArticleMiniature,
          },
        })

        .then(() => {
          if (!fields.miniature) {
            fs.unlinkSync(pathFile + articleMiniature);
          }
          res.status(200).json({ message: 'Modification has been done' });
        })

        .catch((e) => {
          console.log(e);
          //delete file named articleMiniature
          fs.unlinkSync(pathFile + newArticleMiniature);
          res.status(400).json({ error: 'Le titre existe déjà ' });
        })
        .finally(() => {
          prisma.$disconnect();
        });
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }

  return prisma.$disconnect();
}
