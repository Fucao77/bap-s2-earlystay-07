import React from 'react';
import { UPLOAD_PATH } from '../../../constants/upload';
import Link from 'next/link';
import {
  article_header,
  blockimg,
  contenu,
  texte,
  footer_article,
  image,
} from '../header-article/headerclient.module.scss';

export default function HeaderArticle({
  title,
  miniature,
  description,
  page = '#',
}) {
  return (
    <div className={article_header}>
      <div className={blockimg}>
        <img
          src={
            miniature?.match(/http/)
              ? miniature
              : `${UPLOAD_PATH.articleImg}/${miniature}`
          }
          alt=""
          className={image}
        />
      </div>

      <div className={contenu}>
        <h2>{title}</h2>

        <div className={texte}>
          <p>{description}</p>
        </div>

        <div className={footer_article}>
          <p>25 mars 2021 </p>
          <Link href={page}>
            <a href="#">Voir plus</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
