/*
  Warnings:

  - You are about to drop the column `paragraph_id` on the `option_images` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `option_images` table. All the data in the column will be lost.
  - Added the required column `option_id` to the `option_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `option_images` DROP FOREIGN KEY `option_images_ibfk_1`;

-- AlterTable
ALTER TABLE `option_images` DROP COLUMN `paragraph_id`,
    DROP COLUMN `number`,
    ADD COLUMN     `option_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_option_description_paragraph_objects_paragraph_id` ON `option_images`(`option_id`);

-- AddForeignKey
ALTER TABLE `option_images` ADD FOREIGN KEY (`option_id`) REFERENCES `option_description`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
