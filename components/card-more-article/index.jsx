import React from 'react';
import Link from 'next/link';
import {
  imageCard,
  articleCard,
  articleDescription,
  block,
  articleDate,
  articleIcon,
} from './card-more-article.module.scss';

export default function CardArticle({ img, description, date, page }) {
  const imgUrl = '/upload-image/article-image/' + img;

  return (
    <>
      <article className={articleCard}>
        <img src={imgUrl} alt="image-more" className={imageCard} />
        <p className={articleDescription}>{description}</p>

        <div className={block}>
          <div className={articleIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                fill="black"
              />
            </svg>

            <p className={articleDate}>{date}</p>
          </div>
          <Link href={page}>
            <a>Voir plus</a>
          </Link>
        </div>
      </article>
    </>
  );
}
