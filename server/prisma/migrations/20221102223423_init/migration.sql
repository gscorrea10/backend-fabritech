BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[clients] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [cpf] NVARCHAR(1000) NOT NULL,
    [adress] NVARCHAR(1000) NOT NULL,
    [kinship] NVARCHAR(1000),
    CONSTRAINT [clients_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [clients_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [clients_cpf_key] UNIQUE NONCLUSTERED ([cpf])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
