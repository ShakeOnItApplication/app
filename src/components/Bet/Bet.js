import React, { Component } from 'react';
import axios from 'axios';
import './Bet.css';
import CounterBet from './CounterBet';
import EndBet from '../EndBet/EndBet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPendingBets, getActiveBets } from '../../ducks/reducer';

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEndBet: false,
      showCounterBet: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
    }
  }

  handleBet(decision) {
    this.props.bet.decision = decision;
    axios.post('/api/stripe/handleBet', this.props.bet).then(response => {
      this.props.dispatch(getPendingBets(this.props.userInfo.user_id));
      this.props.dispatch(getActiveBets(this.props.userInfo.user_id));
    });
  }

  handleEndBet() {
    console.log(this.props.bet, this.props.userId);
    if (this.props.bet.admin_user_id !== this.props.userId) {
      return;
    }
    this.setState({
      showEndBet: true
    });
  }

  toggleCounterBet() {
    this.setState({
      showCounterBet: !this.state.showCounterBet
    });
  }

  closeEndBet() {
    this.setState({
      showEndBet: false
    });
  }

  render() {
    const bet = this.props.bet;
    const admin_name = `${JSON.parse(bet.admin_info).first_name} ${
      JSON.parse(bet.admin_info).last_name
    }`;
    const opponent_name = `${JSON.parse(bet.opponent_info).first_name} ${
      JSON.parse(bet.opponent_info).last_name
    }`;
    console.log(bet.admin_user_id, this.props.userId);
    return (
      <div className="bet-container">
        <div className="flex-between bet-width">
          <div>
            <div className="bet-text">
              {' '}
              {bet.admin_user_id === this.props.userId ? (
                <div>
                  <div className="bet-headers">Awaiting</div>
                  <div className="name">{opponent_name}</div>
                </div>
              ) : (
                <div>
                  <div className="bet-headers">Against</div>
                  <div className="name">{admin_name}</div>
                </div>
              )}
            </div>
          </div>
          <div className="bet-text">
            <div className="bet-headers">Bet</div>
            <div className="name"> {bet.bet_title} </div>
          </div>
          {this.props.status === 'pending' ? (
            <div className="bet-text">
              <div className="bet-headers">Wager</div>
              <div className="amount"> ${bet.amount} </div>
            </div>
          ) : (
            <div className="bet-text">
              <div className="bet-headers">Pot</div>
              <div className="amount"> ${bet.amount * 2} </div>
            </div>
          )}
        </div>
        {this.props.status === 'pending' &&
          this.props.userId !== bet.admin_user_id && (
            <div className="flex-center handle-buttons">
              <div
                className="button-main"
                onClick={() => this.handleBet('accept')}
              >
                Accept
              </div>
              <div
                className="button-main"
                onClick={() => this.toggleCounterBet()}
              >
                Counter
              </div>
              <div
                className="button-main"
                onClick={() => this.handleBet('deny')}
              >
                Deny
              </div>
            </div>
          )}
        {this.props.status === 'active' &&
          this.props.userId === bet.admin_user_id && (
            <div className="flex-center handle-buttons">
              <div className="button-main" onClick={() => this.handleEndBet()}>
                End Bet
              </div>
            </div>
          )}
        {this.state.showEndBet && (
          <EndBet close={this.closeEndBet.bind(this)} bet={bet} />
        )}
        {this.state.showCounterBet && (
          <CounterBet
            hideCounterBet={this.toggleCounterBet.bind(this)}
            bet={bet}
          />
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Bet));
