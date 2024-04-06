import { Prisma } from ".prisma/client";

export type RecognizedField = {
  date?: Date;
  amount?: Prisma.Decimal;
  tagIds?: number[];
  note?: string;
  subcategory?: number;
  settlementAccountId?: number;
  methodOfPaymentId?: number;
};

export type Entity = {
  id: number;
  name: string;
  [key: string]: number | string;
};

export type RecognizableEntries = {
  subcategories: Entity[];
  tags: Entity[];
  settlementAccounts: Entity[];
  methodOfPayments: Entity[];
};
