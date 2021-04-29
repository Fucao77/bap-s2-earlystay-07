import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

/**
 * Get user according his connection data
 *
 * @param {string} username
 * @param {string} password
 * @returns { username: string } | null
 */
export const login = async (username, password) => {
  const prisma = new PrismaClient();

  const result = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  prisma.$disconnect();

  if (result) {
    const passwordIsCorrect = await bcrypt.compare(password, result.password);

    if (passwordIsCorrect) {
      return { username: result.username };
    }
  }

  return null;
};
