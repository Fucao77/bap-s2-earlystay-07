/*
  Warnings:

  - You are about to alter the column `between_begin` on the `travel_item` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `between_end` on the `travel_item` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `travel_item` MODIFY `between_begin` DATETIME NOT NULL,
    MODIFY `between_end` DATETIME NOT NULL;
