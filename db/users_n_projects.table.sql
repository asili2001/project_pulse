DROP TABLE IF EXISTS users_n_projects;

CREATE TABLE users_n_projects (
	project_id INT NOT NULL,
    user_id INT NOT NULL,
    
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
