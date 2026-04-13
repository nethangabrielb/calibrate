/*
  Warnings:

  - You are about to alter the column `score` on the `Analysis` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Analysis" ALTER COLUMN "score" SET DATA TYPE INTEGER;
