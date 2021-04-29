/*
  Warnings:

  - You are about to drop the column `duration_code` on the `price_data` table. All the data in the column will be lost.
  - You are about to drop the column `duration_value` on the `price_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `price_data` DROP COLUMN `duration_code`,
    DROP COLUMN `duration_value`;
