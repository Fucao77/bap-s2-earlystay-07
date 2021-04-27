import React from 'react';
import { section, titre, liner } from '../blog-client/blogclient.module.scss';
import Nav from '../nav';
import HeaderArticle from './header-article';
import ListArticle from './listes-article';

export default function BlogClient() {
  return (
    <section className={section}>
      <Nav />

      <header>
        <div className={titre}>
          <h1>Blog</h1>
        </div>
      </header>

      <HeaderArticle />

      <div className={liner}></div>

      <ListArticle />
    </section>
  );
}
