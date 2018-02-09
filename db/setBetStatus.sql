UPDATE bets SET status = ${status} WHERE bet_id = ${bet_id};
SELECT * FROM bets WHERE bet_id = ${bet_id};