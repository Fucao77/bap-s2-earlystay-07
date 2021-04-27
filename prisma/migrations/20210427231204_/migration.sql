/*
  Warnings:

  - The primary key for the `travel_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `person_quantity` on the `travel_item` table. All the data in the column will be lost.
  - You are about to drop the column `adult_quantity` on the `travel_item` table. All the data in the column will be lost.
  - You are about to drop the column `child_quantity` on the `travel_item` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `travel_item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - Added the required column `person_quantity_min` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_quantity_max` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adult_quantity_min` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adult_quantity_max` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_quantity_min` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_quantity_max` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infant_quantity_min` to the `travel_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infant_quantity_max` to the `travel_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `travel_item` DROP PRIMARY KEY,
    DROP COLUMN `person_quantity`,
    DROP COLUMN `adult_quantity`,
    DROP COLUMN `child_quantity`,
    ADD COLUMN     `person_quantity_min` INTEGER NOT NULL,
    ADD COLUMN     `person_quantity_max` INTEGER NOT NULL,
    ADD COLUMN     `adult_quantity_min` INTEGER NOT NULL,
    ADD COLUMN     `adult_quantity_max` INTEGER NOT NULL,
    ADD COLUMN     `child_quantity_min` INTEGER NOT NULL,
    ADD COLUMN     `child_quantity_max` INTEGER NOT NULL,
    ADD COLUMN     `infant_quantity_min` INTEGER NOT NULL,
    ADD COLUMN     `infant_quantity_max` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
