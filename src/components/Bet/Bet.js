import React, { Component } from 'react';
import axios from 'axios';
import './Bet.css';
import EndBet from '../EndBet/EndBet';

export default class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEndBet: false
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
      console.log(response);
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
  closeEndBet() {
    this.setState({
      showEndBet: false
    });
  }

  render() {
    const bet = this.props.bet;
    const name = JSON.parse(bet.admin_info);
    return (
      <div className="bet-container">
        <div className="flex-between">
          <div>
            {' '}
            {name.first_name}&nbsp;{name.last_name}
          </div>
          <div> {bet.title} </div>
          <div> ${bet.amount} </div>
        </div>
        {this.props.status === 'pending' && (
          <div className="flex-center">
            <div
              className="button-main"
              onClick={() => this.handleBet('accept')}
            >
              Accept
            </div>
            <div className="button-main" onClick={() => this.handleBet('deny')}>
              Deny
            </div>
          </div>
        )}
        {this.props.status === 'active' && (
          <div className="flex-center">
            <div className="button-main" onClick={() => this.handleEndBet()}>
              End Bet
            </div>
          </div>
        )}
        {this.state.showEndBet && (
          <EndBet close={this.closeEndBet.bind(this)} bet={bet} />
        )}
      </div>
    );
  }
}
