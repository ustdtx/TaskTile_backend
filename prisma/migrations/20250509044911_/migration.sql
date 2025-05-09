/*
  Warnings:

  - You are about to drop the column `completed` on the `ProjectTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectTask" DROP COLUMN "completed",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'ONGOING';
