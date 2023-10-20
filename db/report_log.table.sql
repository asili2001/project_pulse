DELIMITER //

DROP TABLE IF EXISTS report_log;
DROP TRIGGER IF EXISTS add_to_report_log;
DROP VIEW IF EXISTS v_report_info;

CREATE TABLE IF NOT EXISTS report_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    report_id INT NOT NULL,
    project_id INT NOT NULL,
    submission_time INT
)//

CREATE TRIGGER add_to_report_log
AFTER INSERT ON users_n_reports
FOR EACH ROW
BEGIN
    INSERT INTO report_log (user_id, report_id, project_id, submission_time)
    VALUES (NEW.user_id, NEW.report_id, NEW.project_id, UNIX_TIMESTAMP());
END;
//

DELIMITER ;


CREATE VIEW v_report_info AS
SELECT
    r.submission_time AS submission_time,
    u.name AS user_name,
    p.name AS project_name,
    re.name AS report_name,
    u.id AS user_id,
    p.id AS project_id,
    r.id AS report_id
FROM report_log r
JOIN users u ON r.user_id = u.id
JOIN projects p ON r.project_id = p.id
JOIN reports re ON r.report_id = re.id
ORDER BY r.submission_time DESC;


select * from v_report_info;