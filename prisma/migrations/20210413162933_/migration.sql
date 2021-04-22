/*
  Warnings:

  - You are about to drop the column `price_ref` on the `segment_air_type_begins` table. All the data in the column will be lost.
  - Added the required column `price_main_ref` to the `segment_air_type_begins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_original_value` to the `segment_air_type_begins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `segment_air_type_begins` DROP COLUMN `price_ref`,
    ADD COLUMN     `price_main_ref` VARCHAR(100) NOT NULL,
    ADD COLUMN     `price_original_value` INTEGER NOT NULL;
