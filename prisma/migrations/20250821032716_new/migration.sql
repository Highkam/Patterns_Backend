/*
  Warnings:

  - You are about to drop the `User_Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User_Role" DROP CONSTRAINT "User_Role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User_Role" DROP CONSTRAINT "User_Role_userId_fkey";

-- DropTable
DROP TABLE "public"."User_Role";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permission_enabled" BOOLEAN DEFAULT false,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "state" "public"."State" NOT NULL DEFAULT 'ACTIVE',
    "roleId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
