INSERT INTO users (password, email, first_name, last_name)
VALUES (${password}, ${email}, ${first_name}, ${last_name});
SELECT user_id from users WHERE email = ${email};