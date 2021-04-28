/*
  Warnings:

  - The primary key for the `option_description` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `option_description` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `paragraph_id` on the `option_images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - Added the required column `theme_ceto` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `option_images` DROP FOREIGN KEY `option_images_ibfk_1`;

-- AlterTable
ALTER TABLE `option_description` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `option_images` MODIFY `paragraph_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN     `theme_ceto` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `option_images` ADD FOREIGN KEY (`paragraph_id`) REFERENCES `option_description`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
