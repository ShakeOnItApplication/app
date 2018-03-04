import React, { Component } from 'react';
import axios from 'axios';

export default class CounterBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.bet.amount
    };
  }

  counterBet() {
    this.props.bet.amount = this.state.amount;
    axios.post('/api/counterBet', this.props.bet).then(response => {
      this.props.hideCounterBet();
    });
  }

  render() {
    const bet = this.props.bet;
    const admin_name = JSON.parse(bet.admin_info);
    console.log(bet);
    return (
      <div className="modal-wrapper" id="make-counter-bet">
        <div className="modal">
          <div className="title">Make Counter Bet</div>
          <div className="title">Bet: {bet.bet_title}</div>
          <div className="title">
            Against: {admin_name.first_name} {admin_name.last_name}
          </div>

          <div className="input-title">How much are you countering?</div>
          <input
            className="login-input"
            type="text"
            placeholder={'Current Wager: $' + this.state.amount}
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <button className="button-main" onClick={() => this.counterBet()}>
            Propose Counter Bet
          </button>
          <div className="nav-link" onClick={this.props.hideCounterBet}>
            Close
          </div>
        </div>
      </div>
    );
  }
}
