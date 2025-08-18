/*
  Warnings:

  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleToUser" DROP CONSTRAINT "_RoleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleToUser" DROP CONSTRAINT "_RoleToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_PermissionToRole";

-- DropTable
DROP TABLE "public"."_RoleToUser";

-- CreateTable
CREATE TABLE "public"."User_Role" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_Role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "public"."Role_Permission" (
    "roleId" INTEGER NOT NULL,
    "PermissionId" INTEGER NOT NULL,

    CONSTRAINT "Role_Permission_pkey" PRIMARY KEY ("roleId","PermissionId")
);

-- AddForeignKey
ALTER TABLE "public"."User_Role" ADD CONSTRAINT "User_Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_Role" ADD CONSTRAINT "User_Role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Permission" ADD CONSTRAINT "Role_Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Permission" ADD CONSTRAINT "Role_Permission_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES "public"."permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
