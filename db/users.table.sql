DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    personal_number VARCHAR(15) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    role TINYINT NOT NULL DEFAULT 0,
    password VARCHAR(100),
    activated BOOLEAN NOT NULL DEFAULT 0,
    token VARCHAR(20) NOT NULL,
    
    PRIMARY KEY (id)
);
