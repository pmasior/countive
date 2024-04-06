import { Transaction } from "@prisma/client";

export type TransactionWithRelations = Transaction & { tags: number[] };
