import React, { Component } from 'react';
import axios from 'axios';
import Bet from '../Bet/Bet';
import GeneralCard from '../GeneralCard/GeneralCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getActiveBets } from '../../ducks/reducer';

class ActiveBets extends Component {
  componentDidMount() {
    this.props.dispatch(getActiveBets(this.props.userInfo.user_id));
  }

  render() {
    console.log(this.props);
    const activeBets = this.props.activeBets.map((bet, idx) => {
      return (
        <GeneralCard key={bet.bet_id} id={'active' + bet.bet_id}>
          <Bet
            key={bet.bet_id}
            bet={bet}
            userId={this.props.userInfo.user_id}
            status={'active'}
          />
        </GeneralCard>
      );
    });
    return (
      <div className="flex-center-column">
        {this.props.activeBets.length > 0 && (
          <div className="pending-wrapper">
            <div className="section-title align-start">Active Bets</div>
            {activeBets}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(ActiveBets));
