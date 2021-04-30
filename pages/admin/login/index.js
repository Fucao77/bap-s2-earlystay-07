import Footer from '../../../components/global/footer';
import Connection from '../../../components/connection';
import { getCsrfToken, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Connexion({ csrfToken }) {
  const router = useRouter();

  const connection = (connectionData) => {
    signIn('credentials', connectionData).then(() => {
      router.push('/admin/articles');
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
