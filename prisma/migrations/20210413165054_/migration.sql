/*
  Warnings:

  - You are about to drop the column `ref` on the `air_type_begins` table. All the data in the column will be lost.
  - Added the required column `price_ref` to the `air_type_begins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `air_type_begins` DROP COLUMN `ref`,
    ADD COLUMN     `price_ref` VARCHAR(50) NOT NULL;
