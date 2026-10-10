-- Ejecutar en la base AcademicSystem antes de desplegar el bloqueo de login.
IF COL_LENGTH('dbo.Users', 'FailedLoginAttempts') IS NULL
BEGIN
    ALTER TABLE dbo.Users
        ADD FailedLoginAttempts int NOT NULL
            CONSTRAINT DF_Users_FailedLoginAttempts DEFAULT (0);
END;

IF COL_LENGTH('dbo.Users', 'FailedLoginWindowStartedAt') IS NULL
BEGIN
    ALTER TABLE dbo.Users
        ADD FailedLoginWindowStartedAt datetimeoffset NULL;
END;

IF COL_LENGTH('dbo.Users', 'LockedUntil') IS NULL
BEGIN
    ALTER TABLE dbo.Users
        ADD LockedUntil datetimeoffset NULL;
END;
