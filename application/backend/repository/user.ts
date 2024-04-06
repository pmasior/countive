import { generateHashedPassword } from "backend/auth/hashPassword";
import prisma from "prisma/prismaClient";

/**
 * Creates new User or doesn't create User if it's already exist
 * @param email e-mail of newly created user
 * @param password plain text password of newly created user
 * @returns user object
 */
export const createUserIfNotExist = async (email: string, password: string) => {
  // TODO: move to middleware
  const hashedPassword = generateHashedPassword(password);

  return await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });
};

/**
 * Find user in database
 * @param email user's email address
 * @param password user's plain text password
 * @returns user object
 */
export const findUserByEmail = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
  });
