/*
  Warnings:

  - You are about to drop the `Role_Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Role_Permission" DROP CONSTRAINT "Role_Permission_PermissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role_Permission" DROP CONSTRAINT "Role_Permission_roleId_fkey";

-- AlterTable
ALTER TABLE "public"."roles" ADD COLUMN     "permissions" TEXT[];

-- DropTable
DROP TABLE "public"."Role_Permission";

-- DropTable
DROP TABLE "public"."permissions";
