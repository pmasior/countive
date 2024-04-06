import { MethodOfPayment } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { findSettlementAccount } from "./settlementAccount";

export const getMethodOfPayment = async (email: string) =>
  await prisma.methodOfPayment.findMany({
    where: { settlementAccount: { user: { email: email } } },
  });

export const findMethodOfPayment = async (email: string, id: number) =>
  await prisma.methodOfPayment.findFirst({
    where: { id: id, settlementAccount: { user: { email: email } } },
  });

export const createMethodOfPayment = async (
  email: string,
  data: MethodOfPayment
) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.methodOfPayment.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateMethodOfPayment = async (
  email: string,
  data: MethodOfPayment
) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserMethodOfPaymentId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.methodOfPayment.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeMethodOfPayment = async (email: string, id: number) => {
  await breakIfUseOtherUserMethodOfPaymentId(email, id);

  await prisma.methodOfPayment.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: MethodOfPayment) => ({
  name: data.name,
  icon: { connect: { id: data.iconId } },
  settlementAccount: { connect: { id: data.settlementAccountId } },
});

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: MethodOfPayment
) => {
  if (!(await findSettlementAccount(email, data.settlementAccountId)))
    throw new Error("Settlement Account not found");
};

const breakIfUseOtherUserMethodOfPaymentId = async (
  email: string,
  id: number
) => {
  if (!(await findMethodOfPayment(email, id)))
    throw new Error("Method Of Payment not found");
};
