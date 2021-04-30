/*
  Warnings:

  - Added the required column `catch_phrase` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN     `catch_phrase` LONGTEXT NOT NULL;
