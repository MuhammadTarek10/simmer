/*
  Warnings:

  - You are about to drop the column `name_clean` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name_clean` on the `Customer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invoice_date" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Company" ("comment", "created_at", "id", "invoice_date", "name", "phone", "updated_at") SELECT "comment", "created_at", "id", "invoice_date", "name", "phone", "updated_at" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "national_id" TEXT,
    "address" TEXT,
    "grand_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("address", "comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at") SELECT "address", "comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE INDEX "Customer_name_national_id_idx" ON "Customer"("name", "national_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
