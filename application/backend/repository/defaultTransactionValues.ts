import { DefaultTransactionValues } from ".prisma/client";
import prisma from "prisma/prismaClient";
import { findMethodOfPayment } from "./methodOfPayment";
import { findSettlementAccount } from "./settlementAccount";
import { findSubcategory } from "./subcategory";

export const getDefaultTransactionValues = async (email: string) =>
  await prisma.defaultTransactionValues.findMany({
    where: { user: { email: email } },
  });

export const findDefaultTransactionValues = async (email: string, id: string) =>
  await prisma.defaultTransactionValues.findFirst({
    where: { userId: id, user: { email: email } },
  });

export const updateDefaultTransactionValues = async (
  email: string,
  data: DefaultTransactionValues
) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserDefaultTransactionValuesId(email, data.userId);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.defaultTransactionValues.update({
    where: { userId: data.userId },
    data: {
      currency: data.currencyId
        ? { connect: { id: data.currencyId } }
        : { disconnect: true },
      subcategory: data.subcategoryId
        ? { connect: { id: data.subcategoryId } }
        : { disconnect: true },
      settlementAccount: data.settlementAccountId
        ? { connect: { id: data.settlementAccountId } }
        : { disconnect: true },
      methodOfPayment: data.methodOfPaymentId
        ? { connect: { id: data.methodOfPaymentId } }
        : { disconnect: true },
    },
  });
};

export const createDefaultTransactionValues = async (
  email: string,
  data: DefaultTransactionValues
) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.defaultTransactionValues.create({
    data: {
      user: { connect: { id: data.userId } },
    },
  });
};

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: DefaultTransactionValues
) => {
  if (data.subcategoryId && !(await findSubcategory(email, data.subcategoryId)))
    throw new Error("Subcategory not found");
  if (
    data.settlementAccountId &&
    !(await findSettlementAccount(email, data.settlementAccountId))
  )
    throw new Error("Settlement Account not found");
  if (
    data.methodOfPaymentId &&
    !(await findMethodOfPayment(email, data.methodOfPaymentId))
  )
    throw new Error("Method of Payment not found");
};

const breakIfUseOtherUserDefaultTransactionValuesId = async (
  email: string,
  id: string
) => {
  if (!(await findDefaultTransactionValues(email, id)))
    throw new Error("Default Transaction Values not found");
};
