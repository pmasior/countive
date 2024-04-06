import prisma from "prisma/prismaClient";

export const getIcon = async () => await prisma.icon.findMany();
