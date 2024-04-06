import { SettlementAccount } from "@prisma/client";
import prisma from "prisma/prismaClient";

export const getSettlementAccount = async (email: string) =>
  await prisma.settlementAccount.findMany({
    where: { user: { email: email } },
  });

export const findSettlementAccount = async (email: string, id: number) =>
  await prisma.settlementAccount.findFirst({
    where: { id: id, user: { email: email } },
  });

export const createSettlementAccount = async (
  email: string,
  data: SettlementAccount
) => {
  await prisma.settlementAccount.create({
    data: getDatabaseQueryData(email, data),
  });
};

export const updateSettlementAccount = async (
  email: string,
  data: SettlementAccount
) => {
  await breakIfUseOtherUserSettlementAccountId(email, data.id);

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.settlementAccount.update({
    where: { id: data.id },
    data: getDatabaseQueryData(email, data),
  });
};

export const removeSettlementAccount = async (email: string, id: number) => {
  await breakIfUseOtherUserSettlementAccountId(email, id);

  await prisma.settlementAccount.delete({ where: { id: id } });
};

const getDatabaseQueryData = (email: string, data: SettlementAccount) => ({
  name: data.name,
  color: data.color,
  user: { connect: { email: email } },
});

const breakIfUseOtherUserSettlementAccountId = async (
  email: string,
  id: number
) => {
  if (!(await findSettlementAccount(email, id)))
    throw new Error("Settlement Account not found");
};
