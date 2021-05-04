import { PrismaClient } from '@prisma/client';
import Nav from '../../components/global/nav';
import classNames from 'classnames';
import { serializeDateInObject } from '../../utils/serializer';
import { dateToString } from '../../utils/date';
import CardArticle from '../../components/card-more-article';
import Footer from '../../components/global/footer';

import {
  imageText,
  textCenter,
  blogArticle,
  titleArticle,
  descriptionArticle,
  imageArticle,
  contentArticle,
  dateArticle,
  sectionMoreArticle,
  h2Article,
} from '../../styles/pages/article.module.scss';
import HtmlParser from 'react-html-parser';

export default function article({ article, moreArticles, previousArticles }) {
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
  }

  const srcMiniature = '/upload-image/article-image/' + article.miniature;

  const dateParse = dateToString(new Date(Date.parse(article.created_at)));

  let date = titleCase(dateParse);

  return (
    <>
      <Nav />
      <article className={blogArticle}>
        <h1 className={classNames(textCenter, titleArticle)}>
          {article.title}
        </h1>

        <div className={imageText}>
          <img src={srcMiniature} className={imageArticle} />
          <p className={descriptionArticle}>{article.description}</p>
        </div>

        <div className={contentArticle}>{HtmlParser(article.content)}</div>

        <p className={dateArticle}>{date}</p>
      </article>

      <h2 className={h2Article}>
        {' '}
        {moreArticles?.length > 0
          ? 'Articles suivants :'
          : 'Articles précédents :'}
      </h2>

      <section className={sectionMoreArticle}>
        {(moreArticles?.length > 0 ? moreArticles : previousArticles).map(
          (article) => (
            <CardArticle
              key={article.id}
              id={article.id}
              img={article.miniature}
              description={article.description.slice(0, 200)}
              date={titleCase(
                dateToString(new Date(Date.parse(article.created_at)))
              )}
              page={`/blog/${article.slug}`}
            />
          )
        )}
      </section>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const slug = context.query.slug;

  let moreArticles = null;
  let previousArticles = null;

  let article = await prisma.articles.findUnique({
    where: {
      slug,
    },
  });

  moreArticles = await prisma.articles.findMany({
    take: 2,
    where: {
      id: {
        gt: article.id,
      },
    },
    orderBy: {
      title: 'desc',
    },
  });

  moreArticles.map((article) => serializeDateInObject(article));

  if (!moreArticles || moreArticles.length === 0) {
    previousArticles = await prisma.articles.findMany({
      take: 2,
      where: {
        id: {
          lt: article.id,
        },
      },
      orderBy: {
        title: 'desc',
      },
    });

    previousArticles.map((article) => serializeDateInObject(article));
  }

  article = serializeDateInObject(article);

  prisma.$disconnect();

  return {
    props: {
      article,
      moreArticles,
      previousArticles,
    },
  };
}
