-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Mural_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Mural" ("createdAt", "descricao", "id", "imagem", "titulo") SELECT "createdAt", "descricao", "id", "imagem", "titulo" FROM "Mural";
DROP TABLE "Mural";
ALTER TABLE "new_Mural" RENAME TO "Mural";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
