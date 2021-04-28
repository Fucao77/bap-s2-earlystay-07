/*
  Warnings:

  - You are about to alter the column `travel_id` on the `travel_item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - The primary key for the `travels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `travels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `travel_item` DROP FOREIGN KEY `travel_item_ibfk_1`;

-- AlterTable
ALTER TABLE `travel_item` MODIFY `travel_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `travels` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `travel_item` ADD FOREIGN KEY (`travel_id`) REFERENCES `travels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
