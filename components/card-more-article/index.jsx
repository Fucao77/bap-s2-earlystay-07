import React from 'react';
import {
  imageCard,
  articleCard,
  articleDescription,
  block,
  articleDate,
  articleCalendar,
  articleIcon,
} from './card-more-article.module.scss';

export default function CardArticle({ id, img, description, date }) {
  const imgUrl = '/upload-image/article-image/' + img;

  const descripTrunc = description.split(' ').splice(0, 70).join(' ') + '...';

  return (
    <>
      <article className={articleCard}>
        <img src={imgUrl} alt="image-more" className={imageCard} />
        <p className={articleDescription}>{descripTrunc}</p>

        <div className={block}>
          <div className={articleIcon}>
            <img src="/img/calendar.png" alt="" className={articleCalendar} />
            <p className={articleDate}>{date}</p>
          </div>
          <a href={'/articles/' + id}>Voir plus</a>
        </div>
      </article>
    </>
  );
}
