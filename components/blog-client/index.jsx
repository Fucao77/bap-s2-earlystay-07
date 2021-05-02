import React from 'react';
import {
  section,
  titre,
  articlesWrapper,
} from '../blog-client/blogclient.module.scss';
import Footer from '../global/footer';
import HeaderArticle from './header-article';
import Nav from '../global/nav';
import ListArticle from './listes-article';

export default function BlogClient({ articles }) {
  const mainArticle = articles.articles[0];
  const annexArticles = articles.articles.slice(
    1,
    articles.articles.length - 1
  );

  return (
    <section className={section}>
      <Nav />

      <header>
        <div className={titre}>
          <h1>Blog</h1>
        </div>
      </header>

      <div>
        <HeaderArticle
          title={mainArticle.title}
          miniature={mainArticle.miniature}
          description={mainArticle.description.slice(0, 250)}
          page={`/blog/${mainArticle.slug}`}
        />
      </div>

      <section className={articlesWrapper}>
        {annexArticles.map((article) => (
          <ListArticle
            key={article.id}
            title={article.title}
            description={article.description.slice(0, 150) + '...'}
            miniature={article.miniature}
            publishedAt={new Date(Date.parse(article.created_at))}
            page={`/blog/${article.slug}`}
          />
        ))}
      </section>

      <footer>
        <Footer />
      </footer>
    </section>
  );
}
