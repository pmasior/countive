import { Prisma } from "@prisma/client";
import { convertFastTransactionToTransaction } from "./convertFastTransactionToTransaction";
import { RecognizableEntries } from "./convertFastTransactionToTransaction.types";

//   TODO: mock Date to always return 2021
describe("convertFastTransactionToTransaction", () => {
  const recognizableEntries: RecognizableEntries = {
    subcategories: [
      {
        id: 1,
        name: "Spożywcze",
      },
      {
        id: 21,
        name: "Dom",
      },
      {
        id: 22,
        name: "Domownicy",
      },
      {
        id: 23,
        name: "Wynagrodzenie",
      },
    ],
    tags: [
      {
        id: 12,
        name: "Kaufland",
      },
      {
        id: 15,
        name: "Kraków",
      },
    ],
    methodOfPayments: [],
    settlementAccounts: [],
  };

  it.each`
    inputTransaction                          | date                          | amount      | note          | subcategory | tagIds
    ${"12.12 -18.49 Domo #Kau #Kr `wiourhwe"} | ${"2021-12-11T23:00:00.000Z"} | ${"-18.49"} | ${"wiourhwe"} | ${22}       | ${[12, 15]}
    ${"12.12 -18.49 Domo Kau Kr `wiourhwe"}   | ${"2021-12-11T23:00:00.000Z"} | ${"-18.49"} | ${"wiourhwe"} | ${22}       | ${[12, 15]}
    ${"12.12 +250 W 'company"}                | ${"2021-12-11T23:00:00.000Z"} | ${"+250"}   | ${"company"}  | ${23}       | ${undefined}
  `(
    "should resolve $inputTransaction",
    ({ inputTransaction, date, amount, note, subcategory, tagIds }) => {
      const { transaction } = convertFastTransactionToTransaction(
        inputTransaction,
        recognizableEntries
      );
      // TODO: it stops work in 2022 year

      expect(transaction).toEqual({
        date: new Date(date),
        amount: new Prisma.Decimal(amount),
        note,
        subcategory,
        tagIds,
      });
    }
  );
});
