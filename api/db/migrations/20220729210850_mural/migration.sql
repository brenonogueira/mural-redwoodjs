/*
  Warnings:

  - You are about to drop the `noticia` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nome` on table `autor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "noticia";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "mural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_autor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_autor" ("createdAt", "email", "id", "nome") SELECT "createdAt", "email", "id", "nome" FROM "autor";
DROP TABLE "autor";
ALTER TABLE "new_autor" RENAME TO "autor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
