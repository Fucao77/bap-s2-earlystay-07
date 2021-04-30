import Header from '../../../../components/admin-header';
import Form from '../../../../components/admin-article/form-article';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import { withAuth } from '../../../../utils/auth-guard';

export default function Formulaire({
  id,
  title,
  description,
  content,
  miniature,
}) {
  const [validateMessage, setValidateMessage] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = ({ title, description, content, miniature }) => {
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('miniature', miniature);

    axios
      .put('/api/edit-article/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then((res) => {
        console.log({ res });
        setValidateMessage('Article modifié');
      })

      .catch((e) => {
        console.log(e);
        setErrors({ general: e.response.data });
      });
  };

  return (
    <div>
      <Header title={"Edition d'article"}></Header>

      <h2>Mon article : {title}</h2>
      <Form
        id={id}
        prevTitle={title}
        prevDescription={description}
        prevContent={content}
        prevMiniature={miniature}
        onSubmit={onSubmit}
        validateMessage={validateMessage}
        errors={errors}
      />
    </div>
  );
}

export const getServerSideProps = async (context) =>
  withAuth(context, {
    serverFunction: async () => {
      const prisma = new PrismaClient();
      const id = parseInt(context.query.id);

      const articles = await prisma.articles.findUnique({
        where: {
          id: id,
        },
      });

      const title = articles.title;
      const description = articles.description;
      const content = articles.content;
      const miniature = articles.miniature;

      prisma.$disconnect();

      return {
        id: id,
        title: title,
        description: description,
        content: content,
        miniature: miniature,
      };
    },
  });
