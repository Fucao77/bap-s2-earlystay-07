import { PrismaClient } from '@prisma/client';
import { ManagerValidator } from '../../../utility/inputValidator/validator';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function editArticle(req, res) {
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

    //save the image
    form.uploadDir = './public/upload-image/article-image';
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      let articleMiniature = articles.miniature;
      const newArticleMiniature = files.miniature.path.substr(34);
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

      if (!content.isValid) {
        //delete file named articleMiniature
        fs.unlinkSync(pathFile + newArticleMiniature);
        res.status(400).json(content.errors);
        return;
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
          fs.unlinkSync(pathFile + articleMiniature);
          res.status(200).json({ message: 'Modification has been done' });
        })

        .catch((e) => {
          console.log(e);
          //delete file named articleMiniature
          fs.unlinkSync(pathFile + newArticleMiniature);
          res.status(400).json({ error: 'Le titre existe déjà ' });
        });
    });
  } catch (e) {
    console.log(e);
  }

  return prisma.$disconnect();
}
