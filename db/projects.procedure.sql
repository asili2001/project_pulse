DROP PROCEDURE IF EXISTS newReport;
DROP PROCEDURE IF EXISTS newProject;
DROP PROCEDURE IF EXISTS getUnassignedMembers;
DROP PROCEDURE IF EXISTS assignMember;
DROP PROCEDURE IF EXISTS getMemberReports;
DROP PROCEDURE IF EXISTS SubmitReport;

DELIMITER //

CREATE PROCEDURE newProject(
	p_name VARCHAR(50),
    p_report_frequency VARCHAR(50)
)
BEGIN
	INSERT INTO projects (name, report_frequency_type) VALUES (p_name, p_report_frequency);
    
	SELECT LAST_INSERT_ID() AS project_id;
END //


CREATE PROCEDURE newReport(
	r_name VARCHAR(50),
    r_project_id INT,
    r_start INT,
    r_end INT
)
BEGIN
	INSERT INTO reports (name, project_id, submission_start, submission_end) VALUES (r_name, r_project_id, r_start, r_end);
    
	SELECT LAST_INSERT_ID() AS report_id;
END //

CREATE PROCEDURE assignMember(
	u_id INT,
    p_id INT
)
BEGIN
	DECLARE already_assigned INT;
    SELECT COUNT(*) INTO already_assigned FROM users_n_projects WHERE user_id = u_id AND project_id = p_id;
    
    IF already_assigned = 0 THEN
		INSERT INTO users_n_projects (user_id, project_id) VALUES (u_id, p_id);
	END IF;
END//

CREATE PROCEDURE getUnassignedMembers(IN p_id INT)
BEGIN
    SELECT v_users.*
    FROM v_users
    WHERE v_users.id NOT IN (SELECT user_id FROM users_n_projects WHERE project_id = p_id);
END//

CREATE PROCEDURE getMemberReports(
    IN p_id INT,
    IN u_id INT
)
BEGIN
    SELECT 
        reports.id,
        reports.name,
        reports.submission_start,
        reports.submission_end,
        users_n_reports.content,
        IFNULL(users_n_reports.submission_date, NULL) AS submission_date,
        IFNULL(users_n_reports.is_read, 0) AS is_read
    FROM reports
    LEFT JOIN users_n_reports ON reports.id = users_n_reports.report_id
                          AND users_n_reports.user_id = u_id
    WHERE reports.project_id = p_id;
END//


CREATE PROCEDURE SubmitReport(
	IN u_id INT,
    IN r_id INT,
    IN p_id INT,
    IN r_content TEXT
)
BEGIN
	DECLARE already_submitted INT;
    SELECT COUNT(*) INTO already_submitted FROM users_n_reports WHERE user_id = u_id AND report_id = r_id AND project_id = p_id;
    
    IF already_submitted = 0 THEN
		INSERT INTO users_n_reports (user_id, report_id, project_id, content, submission_date) VALUES (u_id, r_id, p_id, r_content, UNIX_TIMESTAMP());
	END IF;
END//

CREATE PROCEDURE ToggleReadReport(
	IN r_id INT,
    IN u_id INT
)
BEGIN
    UPDATE users_n_reports SET is_read = !is_read WHERE report_id = r_id AND user_id = u_id;
END//

call ToggleReadReport(1, 3);
select * from users_n_reports where report_id = 1 AND user_id = 3;
