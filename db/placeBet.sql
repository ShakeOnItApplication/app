INSERT INTO bets (admin_user_id, receiver_user_id, amount, bet_title, time_placed)
VALUES (${admin_user_id}, ${receiver_user_id}, ${amount}, ${bet_title}, current_timestamp);
SELECT * FROM bets WHERE admin_user_id = ${admin_user_id} AND status = 'pending';