import { Subcategory } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { getCategory } from "./category";

export const getSubcategory = async (email: string) =>
  await prisma.subcategory.findMany({
    where: { category: { user: { email: email } } },
  });

export const findSubcategory = async (email: string, id: number) =>
  await prisma.subcategory.findFirst({
    where: { id: id, category: { user: { email: email } } },
  });

export const getSubcategoryForCategory = async (
  email: string,
  categoryName: string
) =>
  await prisma.subcategory.findMany({
    where: {
      category: {
        user: { email: email },
        name: { equals: categoryName, mode: "insensitive" },
      },
    },
  });

export const createSubcategory = async (email: string, data: Subcategory) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.subcategory.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateSubcategory = async (email: string, data: Subcategory) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserSubcategoryId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.subcategory.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeSubcategory = async (email: string, id: number) => {
  await breakIfUseOtherUserSubcategoryId(email, id);

  await prisma.subcategory.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: Subcategory) => ({
  name: data.name,
  color: data.color,
  icon: { connect: { id: data.iconId } },
  category: { connect: { id: data.categoryId } },
});

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: Subcategory
) => {
  if (!(await getCategory(email, data.categoryId)))
    throw new Error("Category not found");
};

const breakIfUseOtherUserSubcategoryId = async (email: string, id: number) => {
  if (!(await findSubcategory(email, id)))
    throw new Error("Subcategory not found");
};
