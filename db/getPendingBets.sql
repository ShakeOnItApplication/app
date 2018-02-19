SELECT * FROM bets 
WHERE opponent_user_id = ${user_id} AND status = 'pending'
OR admin_user_id = ${user_id} AND status = 'pending';