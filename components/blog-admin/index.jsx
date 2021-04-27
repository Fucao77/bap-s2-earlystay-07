import React from 'react';
import {
  blog,
  titre,
  body,
  liner,
  article,
  slide,
} from '../blog-admin/blog.module.scss';
import Button from './button-article';
import Footer from '../footer';
import Gestion from './article-manager';
import Search from './search-input';
import Slider from './slider-button';

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

        <Search />
      </div>

      <div className={article}>
        <Gestion />

        <Gestion />
      </div>

      <div className={slide}>
        <Slider />
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
