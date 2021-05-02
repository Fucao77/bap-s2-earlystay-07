import Blog from '../../../components/blog-admin/index';
import React from 'react';
import { withAuth } from '../../../utils/auth-guard';
import { getArticles } from '../../../services/blog-service';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function BlogPage({ articles }) {
  const router = useRouter();

  const onChangePage = (data) => {
    router.push('/admin/articles?page=' + data);
  };

  const onDeleteArticle = (id) => {
    axios
      .delete('/api/articles/delete/' + id)
      .then((e) => {
        console.log(e);
        router.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <Blog
        articles={articles}
        currentPage={router?.query.page ? Number(router?.query.page) : 0}
        onChangePage={onChangePage}
        onDeleteArticle={onDeleteArticle}
      />
    </div>
  );
}

export const getServerSideProps = (ctx) =>
  withAuth(ctx, {
    serverFunction: async () => {
      const { page } = ctx.query;
      const articles = await getArticles({ page });
      return {
        articles,
      };
    },
  });
