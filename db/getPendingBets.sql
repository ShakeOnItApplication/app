SELECT * FROM bets 
WHERE opponent_user_id = ${id} AND status = 'pending'
OR admin_user_id = ${id} AND status = 'pending';