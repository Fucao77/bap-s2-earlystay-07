import { PrismaClient } from '@prisma/client';
import Nav from '../../components/nav';
import classNames from 'classnames';
import { ObjectSerializer } from '../../utils/serializer';
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
  sectionMoreArticle,
  h2Article,
} from '../../styles/pages/article.module.scss';

export default function article({
  article,
  firstMoreArticle,
  secondMoreArticle,
}) {
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
  const dateParse2 = dateToString(
    new Date(Date.parse(firstMoreArticle.created_at))
  );
  const dateParse3 = dateToString(
    new Date(Date.parse(secondMoreArticle.created_at))
  );

  let date = titleCase(dateParse);
  let date2 = titleCase(dateParse2);
  let date3 = titleCase(dateParse3);

  console.log(typeof firstMoreArticle.id);

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

      <h2 className={h2Article}>Articles Similaires :</h2>

      <section className={sectionMoreArticle}>
        {typeof firstMoreArticle.id === 'number' && (
          <CardArticle
            id={firstMoreArticle.id}
            img={firstMoreArticle.miniature}
            description={firstMoreArticle.description}
            date={date2}
          />
        )}

        {typeof secondMoreArticle.id === 'number' && (
          <CardArticle
            id={secondMoreArticle.id}
            img={secondMoreArticle.miniature}
            description={secondMoreArticle.description}
            date={date3}
          />
        )}
      </section>
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

  const serializeArticle = new ObjectSerializer();

  let moreArticle = await prisma.articles.findMany({
    take: 2,
    where: {
      id: {
        gte: id,
      },
    },
    orderBy: {
      title: 'desc',
    },
  });

  article = serializeArticle.serialize(article);

  prisma.$disconnect();

  if (moreArticle) {
    let firstMoreArticle = moreArticle[0];
    let secondMoreArticle = moreArticle[1];
    firstMoreArticle = serializeArticle.serialize(firstMoreArticle);
    secondMoreArticle = serializeArticle.serialize(secondMoreArticle);

    return {
      props: {
        article,
        firstMoreArticle,
        secondMoreArticle,
      },
    };
  } else {
    return {
      props: {
        article,
      },
    };
  }
}
