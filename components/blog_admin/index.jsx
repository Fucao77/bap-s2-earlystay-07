import React from 'react';
import {
  blog,
  titre,
  body,
  search,
  liner,
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
        <div className={search}></div>
      </div>

      <Gestion />
    </div>
  );
}
