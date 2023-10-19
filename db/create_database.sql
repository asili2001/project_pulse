DROP DATABASE IF EXISTS project_pulse;
CREATE DATABASE project_pulse;
USE project_pulse;

-- Dev DB

DROP DATABASE IF EXISTS project_pulse_dev;
CREATE DATABASE project_pulse_dev;
USE project_pulse_dev;

SELECT * FROM users;
SELECT * from projects;

DELETE FROM users WHERE id != 1;
DELETE FROM reports;
DELETE FROM projects;

CALL newProject("Hejsan", "weekly");
SELECT last_insert_id() FROM projects;


CALL NewUser("ahmad asili", "200107158255", "0766666666", "ahmad@gmail.com");
CALL GetUserToken("ahmad@gmail.com");

