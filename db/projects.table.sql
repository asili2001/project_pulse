DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS reports;

CREATE TABLE projects (
	id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    report_frequency_type VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reports (
	id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    project_id INT NOT NULL,
    submission_start INT NOT NULL,
    submission_end INT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

