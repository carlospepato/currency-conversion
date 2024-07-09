-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "convertedAmount" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_history" ("amount", "convertedAmount", "createdAt", "from", "id", "to") SELECT "amount", "convertedAmount", "createdAt", "from", "id", "to" FROM "history";
DROP TABLE "history";
ALTER TABLE "new_history" RENAME TO "history";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
