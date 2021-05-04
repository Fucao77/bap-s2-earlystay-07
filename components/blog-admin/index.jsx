import React from 'react';
import {
  blog,
  titre,
  body,
  article,
  pageBtnWrapper,
  titleHeader,
} from '../blog-admin/blog.module.scss';
import Button from './button-article';
import Footer from '../global/footer';
import ArticleItem from './article-manager';
import Search from './search-input';
import SubTitle from '../global/sub-title';
import PageBar from '../global/page-bar';
import { generateArrayOfValue } from '../../utils/array';

export default function Blog({
  articles,
  onChangePage,
  currentPage = 0,
  onDeleteArticle,
}) {
  return (
    <div className={blog}>
      <header>
        <h1 className={titre}>Gérer le blog</h1>
        <Button href="/admin/articles/create" />
      </header>
      <div className={body}>
        <div className={titleHeader}>
          <SubTitle title="Mes articles" />
          <Search />
        </div>
      </div>
      <div className={article}>
        {articles.articles.map((article) => (
          <ArticleItem
            key={article.id}
            title={article.title}
            imageUrl={article.miniature}
            description={article.description.slice(0, 300)}
            id={article.id}
            createdAt={new Date(Date.parse(article.created_at))}
            onDelete={() => onDeleteArticle(article.id)}
          />
        ))}
      </div>

      <div className={pageBtnWrapper}>
        <PageBar
          currentValue={currentPage}
          onClick={onChangePage}
          values={generateArrayOfValue({
            min: 0,
            max: articles.pageNumber - 1,
          })}
        />
      </div>

      <Footer />
    </div>
  );
}
