import React from 'react';
import Nav from '../nav';
import {
  section,
  titre,
  article_header,
  image,
  contenu,
} from '../blog-client/blogclient.module.scss';

export default function Clientblog() {
  return (
    <section className={section}>
      <Nav />

      <header>
        <div className={titre}>
          <h1>Blog</h1>
        </div>
      </header>

      <div className={article_header}>
        <div className={image}>
          <img
            src="https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80"
            alt=""
          />
        </div>

        <div className={contenu}>
          <h2>Titre</h2>
        </div>
      </div>
    </section>
  );
}
