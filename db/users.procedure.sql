DROP PROCEDURE IF EXISTS NewUser;
DROP PROCEDURE IF EXISTS ChangePass;
DROP PROCEDURE IF EXISTS GetUserToken;

DELIMITER //
-- Create a stored procedure for creating user
CREATE PROCEDURE NewUser (
    IN u_name VARCHAR(50),
    IN u_personal_number VARCHAR(15),
    IN u_phone_number VARCHAR(20),
    IN u_email VARCHAR(100)
)
BEGIN
	DECLARE phone_number_len INT;
    DECLARE personal_number_len INT;
    DECLARE phone_number_valid_pattern VARCHAR(255) DEFAULT '^[0-9]{7,15}$';
    DECLARE RANDOM_TOKEN VARCHAR(20) DEFAULT (SELECT RandomToken());

    -- check if phone number is not valid
    IF NOT u_phone_number REGEXP phone_number_valid_pattern THEN
        SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'INVALID_PHONE_NUMBER';
    END IF;
    
	INSERT INTO users (name, personal_number, phone_number, email, token)
    VALUES (u_name, u_personal_number, u_phone_number, u_email, RANDOM_TOKEN);
    
    SELECT RANDOM_TOKEN as token;
END //

-- Get token
CREATE PROCEDURE GetUserToken (
    IN u_email VARCHAR(100)
)
BEGIN
	SELECT token from users WHERE email = u_email;
END //

-- Create a stored procedure for changing user password and activating account using token
CREATE PROCEDURE ChangePass (
	IN u_token VARCHAR(20),
    IN u_email VARCHAR(100),
    IN u_new_pass VARCHAR(255),
    IN u_activate BOOLEAN
)
BEGIN
	DECLARE user_count INT;
    
    -- Check if u_password is not empty
    IF LENGTH(u_new_pass) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'EMPTY_PASSWORD';
    END IF;
    
    -- check if user exits
    SELECT COUNT(*) INTO user_count
    FROM users
    WHERE token = u_token AND email = u_email;
    
    IF user_count < 1 THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'USER_NOT_FOUND';
	END IF;
    
    UPDATE users 
    SET 
    password = u_new_pass,
    token = RandomToken(),
    activated = u_activate
    WHERE email = u_email AND
    token = u_token;
END //

DELIMITER ;
