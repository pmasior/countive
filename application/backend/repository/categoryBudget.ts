import { CategoryBudget } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { getCategory } from "./category";

export const getCategoryBudgets = async (email: string) =>
  await prisma.categoryBudget.findMany({
    where: { category: { user: { email: email } } },
  });

export const getCategoryBudget = async (email: string, id: number) =>
  await prisma.categoryBudget.findFirst({
    where: { id: id, category: { user: { email: email } } },
  });

export const createCategoryBudget = async (
  email: string,
  data: CategoryBudget
) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.categoryBudget.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateCategoryBudget = async (
  email: string,
  data: CategoryBudget
) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserCategoryBudgetId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.categoryBudget.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeCategoryBudget = async (email: string, id: number) => {
  await breakIfUseOtherUserCategoryBudgetId(email, id);

  await prisma.categoryBudget.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: CategoryBudget) => ({
  amount: data.amount,
  since: data.since,
  until: data.until,
  category: { connect: { id: data.categoryId } },
});

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: CategoryBudget
) => {
  if (!(await getCategory(email, data.categoryId)))
    throw new Error("Category not found");
};

const breakIfUseOtherUserCategoryBudgetId = async (
  email: string,
  id: number
) => {
  if (!(await getCategoryBudget(email, id)))
    throw new Error("Category Budget not found");
};
