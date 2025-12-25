-- AlterTable: Rename Room columns
ALTER TABLE "Room" RENAME COLUMN "name" TO "title";
ALTER TABLE "Room" RENAME COLUMN "image" TO "imageUrl";
