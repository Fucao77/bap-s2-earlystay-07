import { PrismaClient } from '@prisma/client';
import Nav from '../../components/global/nav';
import classNames from 'classnames';
import { serializeDateInObject } from '../../utils/serializer';
import { dateToString } from '../../utils/date';
import CardArticle from '../../components/card-more-article/';

import {
  imageText,
  textCenter,
  blogArticle,
  titleArticle,
  descriptionArticle,
  imageArticle,
  contentArticle,
  dateArticle,
} from '../../styles/pages/index.module.scss';

export default function article({ article, article1 }) {
  const srcMiniature = '/upload-image/article-image/' + article.miniature;

  const dateParse = dateToString(new Date(Date.parse(article.created_at)));
  const dateParse2 = dateToString(new Date(Date.parse(article1.created_at)));
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
  }

  let date = titleCase(dateParse);
  let date2 = titleCase(dateParse2);

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

        <p className={contentArticle}>{article.content}</p>

        <p className={dateArticle}>{date}</p>
      </article>

      <CardArticle
        img={article1.miniature}
        description={article1.description}
        date={date2}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const id = parseInt(context.query.id);

  let article = await prisma.articles.findUnique({
    where: {
      id: id,
    },
  });

  let article1 = await prisma.articles.findUnique({
    where: {
      id: id + 1,
    },
  });

  let article2 = await prisma.articles.findUnique({
    where: {
      id: id + 2,
    },
  });

  article = serializeDateInObject(article);
  article1 = serializeDateInObject(article1);
  article2 = serializeDateInObject(article2);

  prisma.$disconnect();

  return {
    props: {
      article,
      article1,
      article2,
    },
  };
}
