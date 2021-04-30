import Header from '../../../components/admin-header';
import Form from '../../../components/admin-article/form-article';
import axios from 'axios';
import { useState } from 'react';
import { withAuth } from '../../../utils/auth-guard';

export default function Formulaire() {
  const [validateMessage, setValidateMessage] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = ({ title, description, content, miniature }) => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('miniature', miniature);

    axios
      .post('/api/add-article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then((res) => {
        console.log({ res });
        setValidateMessage('Article envoyé');
      })

      .catch((e) => {
        console.log(e.response.data);
        setErrors(e.response.data);
      });
  };

  return (
    <div>
      <Header title={"Création d'article"}></Header>
      <Form
        onSubmit={onSubmit}
        validateMessage={validateMessage}
        errors={errors}
      />
    </div>
  );
}

export const getServerSideProps = (ctx) => withAuth(ctx);
