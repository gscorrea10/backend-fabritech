BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[refresh_token] (
    [id] NVARCHAR(1000) NOT NULL,
    [expires_in] INT,
    [forgotToken] NVARCHAR(1000) NOT NULL,
    [expires_forgot_token] INT,
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [refresh_token_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [refresh_token_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [refresh_token_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [refresh_token_forgotToken_key] UNIQUE NONCLUSTERED ([forgotToken]),
    CONSTRAINT [refresh_token_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[permissions] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [permissions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [permissions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [permissions_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_UsersPermissions] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_UsersPermissions_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_UsersPermissions_B_index] ON [dbo].[_UsersPermissions]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[refresh_token] ADD CONSTRAINT [refresh_token_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UsersPermissions] ADD CONSTRAINT [_UsersPermissions_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[permissions]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UsersPermissions] ADD CONSTRAINT [_UsersPermissions_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
