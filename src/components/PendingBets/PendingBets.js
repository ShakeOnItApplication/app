import React, { Component } from 'react';
import axios from 'axios';
import './PendingBets.css';
import Bet from '../Bet/Bet';
import GeneralCard from '../GeneralCard/GeneralCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPendingBets } from '../../ducks/reducer';

class PendingBets extends Component {
  componentDidMount() {
    this.props.dispatch(getPendingBets(this.props.userInfo.user_id));
  }

  render() {
    console.log(this.props);
    const pendingBets = this.props.pendingBets.map((bet, idx) => {
      return (
        <GeneralCard key={bet.bet_id} id={'pending' + bet.bet_id}>
          <Bet
            key={bet.bet_id}
            userId={this.props.userInfo.user_id}
            bet={bet}
            status={'pending'}
          />
        </GeneralCard>
      );
    });
    return (
      <div className="flex-center-column">
        {this.props.pendingBets.length > 0 && (
          <div className="pending-wrapper">
            <div className="section-title align-start">Pending Bets</div>
            {pendingBets}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(PendingBets));
