INSERT INTO users (username, password, email, first_name, last_name)
VALUES (${username}, ${password}, ${email}, ${first_name}, ${last_name});
SELECT user_id from users WHERE username = ${username};