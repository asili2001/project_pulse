DROP DATABASE IF EXISTS project_pulse;
CREATE DATABASE project_pulse;
USE project_pulse;

SOURCE users.table.sql
SOURCE projects.table.sql
SOURCE users_n_reports.table.sql
SOURCE users_n_projects.table.sql

SOURCE users.procedure.sql
SOURCE projects.procedure.sql

SOURCE users.view.sql
SOURCE projects.view.sql

SOURCE random_token.function.sql

SOURCE report_log.table.sql

-- Create A Default Project Manager Account
CALL NewUser("Ahmad Asili", "200107158255", "0733959666", "ahmadasili1928@gmail.com");
UPDATE users SET role = 1, password = "$2b$10$8TyMbsXalrYZokWBZAB5QeJhx8sDrzvr.JDpjxCBAbR86KTP4aS4q", activated = 1 WHERE email = "ahmadasili1928@gmail.com";

SHOW WARNINGS;