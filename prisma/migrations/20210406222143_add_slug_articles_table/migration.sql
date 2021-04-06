/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` ADD COLUMN     `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `articles.slug_unique` ON `articles`(`slug`);
