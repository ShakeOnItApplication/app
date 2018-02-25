SELECT * FROM bets WHERE
opponent_user_id = ${id} AND status = 'active'
 OR admin_user_id = ${id} AND status = 'active';