DROP TABLE IF EXISTS users_n_reports;

CREATE TABLE users_n_reports (
	report_id INT NOT NULL,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    submission_date INT NOT NULL,
    
    FOREIGN KEY (report_id) REFERENCES reports(id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
