import React, { Component } from 'react';
import axios from 'axios';

export default class EndBet extends Component {
  constructor(props) {
    super(props);
  }

  settleBet(id, amount, bet_id) {
    axios
      .post('/api/stripe/settleBet', { id, amount, bet_id })
      .then(response => {
        console.log(response);
        this.props.close();
      });
  }

  render() {
    const bet = this.props.bet;
    const adminName = JSON.parse(bet.admin_info);
    const opponentName = JSON.parse(bet.opponent_info);
    console.log(bet);
    return (
      <div className="modal-wrapper" id="end-bet">
        <div className="modal">
          <div>Who won?</div>
          <div
            className="button-main"
            onClick={() =>
              this.settleBet(bet.admin_user_id, bet.amount, bet.bet_id)
            }
          >
            {adminName.first_name + ' ' + adminName.last_name}
          </div>
          <div
            className="button-main"
            onClick={() =>
              this.settleBet(bet.opponent_user_id, bet.amount, bet.bet_id)
            }
          >
            {opponentName.first_name + ' ' + opponentName.last_name}
          </div>
          <div className="nav-link" onClick={() => this.props.close()}>
            Close
          </div>
        </div>
      </div>
    );
  }
}
