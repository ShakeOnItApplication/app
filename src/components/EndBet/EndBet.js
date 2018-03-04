import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getActiveBets, getPastBets } from '../../ducks/reducer';
import { BarLoader } from 'react-spinners';

class EndBet extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: ''
    };
  }
  settleBet(name, id, amount, bet_id) {
    this.setState({
      loading: true,
      name
    });
    axios
      .post('/api/stripe/settleBet', { id, amount, bet_id })
      .then(response => {
        this.props.dispatch(getActiveBets(this.props.userInfo.user_id));
        this.props.dispatch(getPastBets(this.props.userInfo.user_id));
        this.props.close();
      });
  }

  render() {
    const bet = this.props.bet;
    const adminNameSetup = JSON.parse(bet.admin_info);
    const adminName =
      adminNameSetup.first_name + ' ' + adminNameSetup.last_name;
    const opponentNameSetup = JSON.parse(bet.opponent_info);
    const opponentName =
      opponentNameSetup.first_name + ' ' + opponentNameSetup.last_name;
    console.log(bet);
    return (
      <div className="modal-wrapper" id="end-bet">
        {this.state.loading ? (
          <div className="modal">
            <div className="input-title">
              Sending Payments to {this.state.name}...
            </div>
            <BarLoader
              loading={this.state.loading}
              height={20}
              color={'#4a4ae6'}
            />
          </div>
        ) : (
          <div className="modal">
            <div>Who won?</div>
            <div
              className="button-main"
              onClick={() =>
                this.settleBet(
                  adminName,
                  bet.admin_user_id,
                  bet.amount,
                  bet.bet_id
                )
              }
            >
              {adminName}
            </div>
            <div
              className="button-main"
              onClick={() =>
                this.settleBet(
                  opponentName,
                  bet.opponent_user_id,
                  bet.amount,
                  bet.bet_id
                )
              }
            >
              {opponentName}
            </div>

            <div className="nav-link" onClick={() => this.props.close()}>
              Close
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(EndBet));
