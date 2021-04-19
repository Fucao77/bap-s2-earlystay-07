import React from 'react';
import {
  blog,
  titre,
  body,
  liner,
  article,
} from '../blog_admin/blog.module.scss';
import Button from '../Create_article';
import Gestion from '../gestion_article';

export default function Blog() {
  return (
    <div className={blog}>
      <header>
        <h1 className={titre}>Gérer le blog</h1>

        <Button />
      </header>
      <div className={body}>
        <h2>Mes articles</h2>
        <div className={liner}></div>
        <div>
          <input type="text" placeholder="Recherche" />
        </div>
      </div>{' '}
      <br /> <br /> <br /> <br />
      <div className={article}>
        <Gestion />
        <br /> <br />
        <Gestion />
        <br /> <br />
      </div>
    </div>
  );
}
