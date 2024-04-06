import { SubcategoryBudget } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { getCategoryBudget } from "./categoryBudget";
import { findSubcategory } from "./subcategory";

export const getSubcategoryBudgets = async (email: string) =>
  await prisma.subcategoryBudget.findMany({
    where: {
      subcategory: { category: { user: { email: email } } },
      categoryBudget: { category: { user: { email: email } } },
    },
  });

export const getSubcategoryBudget = async (email: string, id: number) =>
  await prisma.subcategoryBudget.findFirst({
    where: {
      id: id,
      subcategory: { category: { user: { email: email } } },
      categoryBudget: { category: { user: { email: email } } },
    },
  });

export const createSubcategoryBudget = async (
  email: string,
  data: SubcategoryBudget
) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.subcategoryBudget.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateSubcategoryBudget = async (
  email: string,
  data: SubcategoryBudget
) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserSubcategoryBudgetId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.subcategoryBudget.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeSubcategoryBudget = async (email: string, id: number) => {
  await breakIfUseOtherUserSubcategoryBudgetId(email, id);

  await prisma.subcategoryBudget.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: SubcategoryBudget) => ({
  amount: data.amount,
  subcategory: { connect: { id: data.subcategoryId } },
  categoryBudget: { connect: { id: data.categoryBudgetId } },
});

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: SubcategoryBudget
) => {
  if (!(await findSubcategory(email, data.subcategoryId)))
    throw new Error("Subcategory not found");
  if (!(await getCategoryBudget(email, data.categoryBudgetId)))
    throw new Error("Category Budget not found");
};

const breakIfUseOtherUserSubcategoryBudgetId = async (
  email: string,
  id: number
) => {
  if (!(await getSubcategoryBudget(email, id)))
    throw new Error("Category Budget not found");
};
