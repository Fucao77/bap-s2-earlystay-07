import { PrismaClient } from '.prisma/client';
import { serializeDateInObject } from '../utils/serializer';

/**
 * Get a list of articles (by page)
 *
 * @param {{name: ?string , page : number, take: 10 }} data
 */
export async function getArticles({ name = null, page = 0, take = 10 } = {}) {
  const prisma = new PrismaClient();

  const filters = {};

  if (name) {
    filters.where = {
      name: {
        contain: name,
      },
    };
  }

  const [pageNumber, articles] = await prisma.$transaction([
    prisma.articles.count(filters),
    prisma.articles.findMany({
      ...filters,
      skip: page * take,
      take,
      orderBy: {
        created_at: 'desc',
      },
    }),
  ]);

  return {
    articles: articles.map((article) => serializeDateInObject(article)),
    pageNumber: Math.ceil(pageNumber / take),
  };
}
