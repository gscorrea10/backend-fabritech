/*
  Warnings:

  - You are about to drop the `_UsersPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_UsersPermissions] DROP CONSTRAINT [_UsersPermissions_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_UsersPermissions] DROP CONSTRAINT [_UsersPermissions_B_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[refresh_token] DROP CONSTRAINT [refresh_token_user_id_fkey];

-- DropTable
DROP TABLE [dbo].[_UsersPermissions];

-- DropTable
DROP TABLE [dbo].[permissions];

-- DropTable
DROP TABLE [dbo].[refresh_token];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
