/*
  Warnings:

  - Added the required column `duration_code` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_value` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_night` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_day` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_for` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_unit` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_plan_ref` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_ref` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveller_type` to the `price_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveller_quantity` to the `price_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `price_data` ADD COLUMN     `duration_code` VARCHAR(50) NOT NULL,
    ADD COLUMN     `duration_value` INTEGER NOT NULL,
    ADD COLUMN     `duration_night` INTEGER NOT NULL,
    ADD COLUMN     `duration_day` INTEGER NOT NULL,
    ADD COLUMN     `quantity_for` VARCHAR(50) NOT NULL,
    ADD COLUMN     `quantity_unit` VARCHAR(50) NOT NULL,
    ADD COLUMN     `meal_plan_ref` VARCHAR(50) NOT NULL,
    ADD COLUMN     `room_ref` VARCHAR(50) NOT NULL,
    ADD COLUMN     `traveller_type` VARCHAR(50) NOT NULL,
    ADD COLUMN     `traveller_quantity` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `stay_type_meal_plans` (
    `id` VARCHAR(50) NOT NULL,
    `code_txt` VARCHAR(50) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `text` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_meal_plan_ref` ON `price_data`(`meal_plan_ref`);

-- AddForeignKey
ALTER TABLE `price_data` ADD FOREIGN KEY (`meal_plan_ref`) REFERENCES `stay_type_meal_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
