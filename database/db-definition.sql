-------------------------------------------------------------------------------
--------------------------- DATABASE CONFIGURATIONS ---------------------------
-------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pgjwt;

ALTER DATABASE cakes_by_naty SET "app.jwt_secret" 
    TO 'qUHH5Nh1Xk8Pyg0CpwnvT9LaFKpj6kKUOxtFlqNx5qYyoLGqOldkM1CNr3CxEuMN';
ALTER DATABASE cakes_by_naty SET "app.jwt_refresh_secret" 
    TO 'dLbZMS96W8AEGodpvUWPybKyug9BJ97MYe7uCJSFK4i0i0EVi0novlkiUiH43ipB';
ALTER DATABASE cakes_by_naty SET "app.jwt_double_auth" 
    TO 'dLcZMS96W8AEGodpvUWPybKyug9BJ97MYe7uCJSFK4i0i0EVi0novlkiUiH43ipB';

-------------------------------------------------------------------------------
---------------------------     TABLES CREATION     ---------------------------
-------------------------------------------------------------------------------


-- SQL TABLES AND DATA FILES
\i ../database/db-definition/tables/tables.sql
\i ../database/db-definition/data/testingData.sql



-------------------------------------------------------------------------------
---------------------------  CUSTOM TYPES CREATION  ---------------------------
-------------------------------------------------------------------------------

\i ../database/db-definition/types/all.sql


-------------------------------------------------------------------------------
---------------------------   FUNCTIONS CREATION    ---------------------------
-------------------------------------------------------------------------------
\i ../database/db-definition/functions/login.sql

\i ../database/db-definition/functions/register.sql

\i ../database/db-definition/functions/create_functions.sql




-------------------------------------------------------------------------------
---------------------------------- PRINT END ----------------------------------
-------------------------------------------------------------------------------

\! echo "ALL SCRIPTS RAN CORRECTLY"