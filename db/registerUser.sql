INSERT INTO users (password, email, first_name, last_name, stripe_id, stripe_account_id)
VALUES (${password}, ${email}, ${first_name}, ${last_name}, ${stripe_id}, ${stripe_account_id});
SELECT user_id from users WHERE email = ${email};