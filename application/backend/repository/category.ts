import { Category } from ".prisma/client";
import prisma from "prisma/prismaClient";

export const getCategories = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email } }).categories();
  // return await prisma.category.findMany({ where: { email: email } });
};

export const getCategory = async (email: string, id: number) =>
  await prisma.category.findFirst({
    where: { id: id, user: { email: email } },
  });

export const createCategory = async (email: string, data: Category) => {
  await prisma.category.create({
    data: {
      name: data.name,
      icon: { connect: { id: data.iconId } },
      user: { connect: { email: email } },
    },
  });
};

export const updateCategory = async (email: string, data: Category) => {
  await breakIfUseOtherUserCategoryId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.category.update({
    where: { id: data.id },
    data: {
      name: data.name,
      icon: { connect: { id: data.iconId } },
      user: { connect: { email: email } },
    },
  });
};

export const removeCategory = async (email: string, id: number) => {
  await breakIfUseOtherUserCategoryId(email, id);

  const category = await prisma.category.delete({
    where: { id: id },
  });
};

const breakIfUseOtherUserCategoryId = async (email: string, id: number) => {
  if (!(await getCategory(email, id))) throw new Error("Category not found");
};
