import React from 'react';
import { UPLOAD_PATH } from '../../../constants/upload';
import { dateToString } from '../../../utils/date';
import {
  article,
  img,
  header,
  date,
  footer,
  contenu,
  imgWrapper,
} from './article.module.scss';

export default function ArticleItem({
  title,
  imageUrl,
  description,
  id,
  createdAt,
  onDelete,
}) {
  return (
    <article className={article}>
      <div className={imgWrapper}>
        <img
          src={
            imageUrl.match(/http/)
              ? imageUrl
              : `${UPLOAD_PATH.articleImg}/${imageUrl}`
          }
          alt=""
          className={img}
        />
      </div>

      <div className={contenu}>
        <div className={header}>
          <h1>{title} </h1>

          <div className={date}>
            <p>{dateToString(createdAt)}</p>
          </div>
        </div>

        <div className={description}>
          <p>{description}</p>
        </div>

        <div className={footer}>
          <a href={`/admin/articles/edit/${id}`}>Modifier</a>
          <a href="">Consulter</a>
          <button href="#" onClick={onDelete}>
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
