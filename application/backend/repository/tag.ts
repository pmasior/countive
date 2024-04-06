import { Tag } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { getCategory } from "./category";

export const findTags = async (email: string) =>
  await prisma.tag.findMany({
    where: { category: { user: { email: email } } },
  });

export const findTag = async (email: string, id: number) =>
  await prisma.tag.findFirst({
    where: { id: id, category: { user: { email: email } } },
  });

export const createTag = async (email: string, data: Tag) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.tag.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateTag = async (email: string, data: Tag) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserTagId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.tag.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeTag = async (email: string, id: number) => {
  await breakIfUseOtherUserTagId(email, id);

  await prisma.tag.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: Tag) => ({
  name: data.name,
  category: { connect: { id: data.categoryId } },
});

const breakIfUseOtherUserPropertyIds = async (email: string, data: Tag) => {
  if (!(await getCategory(email, data.categoryId)))
    throw new Error("Category not found");
};

const breakIfUseOtherUserTagId = async (email: string, id: number) => {
  if (!(await findTag(email, id))) throw new Error("Tag not found");
};
