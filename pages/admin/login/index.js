import Nav from '../../../components/nav';
import Footer from '../../../components/footer';
import Connection from '../../../components/connection';
import { getCsrfToken, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Connexion({ csrfToken }) {
  const router = useRouter();

  const connection = (connectionData) => {
    signIn('credentials', connectionData).then(() => {
      router.push('/admin/dashboard');
    });
  };

  return (
    <div>
      <Nav />
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
