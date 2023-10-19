DROP VIEW IF EXISTS v_project_members;
DROP VIEW IF EXISTS v_users;

CREATE VIEW v_users AS
SELECT id, name, personal_number, phone_number, email, role, activated
FROM users;


CREATE VIEW v_project_members AS
SELECT users.id,
users.name,
users.email,
users.phone_number,
users.personal_number,
users.role,
users_n_projects.project_id
FROM users
JOIN users_n_projects ON users_n_projects.user_id = users.id
GROUP BY users.id
;
