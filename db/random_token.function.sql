CREATE FUNCTION RandomToken() RETURNS VARCHAR(20)
BEGIN
    DECLARE characters VARCHAR(100) DEFAULT 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    DECLARE token VARCHAR(20) DEFAULT '';
    DECLARE i INT DEFAULT 1;

    WHILE i <= 20 DO
        SET token = CONCAT(token, SUBSTRING(characters, FLOOR(1 + RAND() * 62), 1));
        SET i = i + 1;
    END WHILE;

    RETURN token;
END;