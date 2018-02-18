SELECT * FROM bets WHERE
opponent_user_id = ${user_id} AND status = 'active'
 OR admin_user_id = ${user_id} AND status = 'active';