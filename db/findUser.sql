SELECT user_id, first_name, last_name FROM users 
WHERE first_name ~ ${first_name}
OR last_name ~ ${last_name};