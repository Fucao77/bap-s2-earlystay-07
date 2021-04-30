import { getSession } from 'next-auth/client';

export async function withAuth(
  context,
  { serverFunction = null, badRedirection = '/' } = {}
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: badRedirection,
      },
    };
  }

  const props = serverFunction && (await serverFunction(session));

  return {
    props: {
      session,
      ...props,
    },
  };
}
