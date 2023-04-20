/*
  Warnings:

  - Made the column `city` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Restaurant` MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;
