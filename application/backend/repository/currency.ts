import prisma from "prisma/prismaClient";

export const getCurrency = async () => await prisma.currency.findMany();
