/*
  Warnings:

  - You are about to drop the column `since` on the `SubcategoryBudget` table. All the data in the column will be lost.
  - You are about to drop the column `until` on the `SubcategoryBudget` table. All the data in the column will be lost.
  - Added the required column `categoryBudgetId` to the `SubcategoryBudget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubcategoryBudget" DROP COLUMN "since",
DROP COLUMN "until",
ADD COLUMN     "categoryBudgetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubcategoryBudget" ADD CONSTRAINT "SubcategoryBudget_categoryBudgetId_fkey" FOREIGN KEY ("categoryBudgetId") REFERENCES "CategoryBudget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
