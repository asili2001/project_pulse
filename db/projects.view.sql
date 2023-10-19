DROP VIEW IF EXISTS v_projects;
DROP VIEW IF EXISTS v_tm_projects;
DROP VIEW IF EXISTS v_reports;
DROP VIEW IF EXISTS v_project_members;

CREATE VIEW v_projects AS
SELECT projects.id, projects.name, projects.report_frequency_type, COUNT(reports.id) AS total_reports
FROM projects
LEFT JOIN reports ON reports.project_id = projects.id
GROUP BY projects.id, projects.name, projects.report_frequency_type;

CREATE VIEW v_tm_projects AS
SELECT
    projects.id,
    projects.name,
    projects.report_frequency_type,
    (
        SELECT COUNT(reports.id)
        FROM reports
        WHERE reports.project_id = projects.id
    ) AS total_reports,
    users_n_projects.user_id
FROM users_n_projects
LEFT JOIN projects ON users_n_projects.project_id = projects.id;

CREATE VIEW v_reports AS
SELECT 
    r.id, 
    r.name, 
    r.project_id, 
    r.submission_start, 
    r.submission_end, 
    COUNT(unr.project_id) AS total_submitted
FROM reports AS r
LEFT JOIN users_n_reports AS unr ON r.id = unr.report_id
GROUP BY r.id, r.name, r.project_id, r.submission_start, r.submission_end;

CREATE VIEW v_project_members AS
SELECT 
    u.*,
    unp.project_id
FROM v_users AS u
LEFT JOIN users_n_projects AS unp ON u.id = unp.user_id;

SELECT * FROM v_tm_projects;
