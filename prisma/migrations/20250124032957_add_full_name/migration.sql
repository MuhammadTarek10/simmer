/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "national_id" TEXT,
    "fullname" TEXT,
    "grand_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Customer" ("comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at") SELECT "comment", "created_at", "grand_name", "id", "name", "national_id", "updated_at" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_national_id_key" ON "Customer"("national_id");
CREATE INDEX "Customer_name_national_id_idx" ON "Customer"("name", "national_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
