import Blog from '../../../components/blog-admin/index';
import React from 'react';
import { withAuth } from '../../../utils/auth-guard';
import { getArticles } from '../../../services/blog-service';

export default function BlogPage({ articles }) {
  console.log(articles);
  return (
    <div>
      <Blog />
    </div>
  );
}

export const getServerSideProps = (ctx) =>
  withAuth(ctx, {
    serverFunction: async () => {
      const articles = await getArticles();
      return {
        articles,
      };
    },
  });
