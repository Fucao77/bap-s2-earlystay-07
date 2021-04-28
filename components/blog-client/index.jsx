import React from 'react';
import {
  section,
  titre,
  liner,
  list,
  article_header,
} from '../blog-client/blogclient.module.scss';
import Footer from '../footer';
import HeaderArticle from './header-article';
import ListArticle from './listes-article';

export default function BlogClient() {
  return (
    <section className={section}>
      {/* <Nav />*/}

      <header>
        <div className={titre}>
          <h1>Blog</h1>
        </div>
      </header>

      <div className={article_header}>
        <HeaderArticle />
      </div>

      <div className={liner}></div>

      <div className={list}>
        <div>
          <ListArticle />
        </div>

        <div>
          <ListArticle />
        </div>
      </div>

      <div className={list}>
        <div>
          <ListArticle />
        </div>

        <div>
          <ListArticle />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </section>
  );
}
