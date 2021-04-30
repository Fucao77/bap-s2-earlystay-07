import Footer from '../../../components/global/footer';
import Connection from '../../../components/connection';
import { getCsrfToken, signIn } from 'next-auth/client';

export default function Connexion({ csrfToken }) {
  const connection = (connectionData) => {
    signIn('credentials', {
      ...connectionData,
      callbackUrl: '/admin/articles',
    });
  };

  return (
    <div>
      <Connection onConnection={connection} csrfToken={csrfToken} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
