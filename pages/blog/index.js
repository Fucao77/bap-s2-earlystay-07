import React from 'react';
import Clientblog from '../../components/blog-client';
import { getArticles } from '../../services/blog-service';

export default function BlogClient({ articles }) {
  return (
    <div>
      <Clientblog articles={articles} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { page } = ctx.query;
  const articles = await getArticles({ page });
  return {
    props: {
      articles,
    },
  };
};
