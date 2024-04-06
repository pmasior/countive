-- CreateTable
CREATE TABLE "DefaultTransactionValues" (
    "userId" TEXT NOT NULL,
    "subcategoryId" INTEGER,
    "currencyId" INTEGER,
    "settlementAccountId" INTEGER,
    "methodOfPaymentId" INTEGER,

    CONSTRAINT "DefaultTransactionValues_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "DefaultTransactionValues" ADD CONSTRAINT "DefaultTransactionValues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultTransactionValues" ADD CONSTRAINT "DefaultTransactionValues_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultTransactionValues" ADD CONSTRAINT "DefaultTransactionValues_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultTransactionValues" ADD CONSTRAINT "DefaultTransactionValues_settlementAccountId_fkey" FOREIGN KEY ("settlementAccountId") REFERENCES "SettlementAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultTransactionValues" ADD CONSTRAINT "DefaultTransactionValues_methodOfPaymentId_fkey" FOREIGN KEY ("methodOfPaymentId") REFERENCES "MethodOfPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
