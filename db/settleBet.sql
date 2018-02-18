UPDATE bets SET winner = ${ id }, status = 'complete' WHERE bet_id = ${ bet_id };
SELECT * from bets WHERE bet_id = ${bet_id};