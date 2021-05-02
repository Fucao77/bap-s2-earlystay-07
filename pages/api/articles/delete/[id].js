import { PrismaClient } from '.prisma/client';
import fs from 'fs';
import { UPLOAD_DIR } from '../../../../constants/upload';

export default async function deleteArticle(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(404);
  }

  const prisma = new PrismaClient();

  const { id } = req.query;

  const article = await prisma.articles.delete({
    where: {
      id: Number(id),
    },
  });

  if (!article) {
    return res.status(400);
  }

  const fileDir = UPLOAD_DIR.image + '/' + article.miniature;

  if (fs.existsSync(fileDir)) {
    fs.unlinkSync(UPLOAD_DIR.image + '/' + article.miniature);
  }

  prisma.$disconnect();

  return res.status(200).json({ res: 'Delete ok' });
}
