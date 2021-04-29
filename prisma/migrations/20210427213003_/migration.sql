/*
  Warnings:

  - A unique constraint covering the columns `[product_code]` on the table `delivery_services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `delivery_services_product_code_unique` ON `delivery_services`(`product_code`);
