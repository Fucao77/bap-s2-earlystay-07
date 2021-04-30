import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import * as AdminAuth from '../../../services/auth/admin-auth';

const options = {
  providers: [
    Providers.Credentials({
      id: 'credentials',
      name: 'Custom login',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password' },
      },
      authorize: async ({ username, password }) => {
        return await AdminAuth.login(username, password)
          .then((res) => Promise.resolve(res))
          .catch(() => Promise.reject('/auth/sign-in?error=BAD_AUTH'));
      },
    }),
  ],
  callbacks: {
    session: async (token, user) => user,
    redirect: async (url) => url,
  },
};

export default (req, res) => NextAuth(req, res, options);
