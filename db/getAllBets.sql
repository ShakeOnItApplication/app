SELECT * FROM bets 
WHERE admin_user_id = ${user_id}
OR receiver_user_id = ${user_id};