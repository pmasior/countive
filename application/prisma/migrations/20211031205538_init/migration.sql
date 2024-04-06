-- CreateTable
CREATE TABLE "user_account" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "user_accountId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_accountId_fkey" FOREIGN KEY ("user_accountId") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
