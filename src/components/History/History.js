import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPastBets } from '../../ducks/reducer';

class History extends Component {
  componentDidMount() {
    this.props.dispatch(getPastBets(this.props.userInfo.user_id));
  }

  render() {
    console.log(this.props);
    const history = this.props.pastBets.map((bet, idx) => {
      return (
        <div className="history flex-between" key={bet.bet_id}>
          <div>{bet.bet_title}</div>
          {this.props.userInfo.user_id === bet.winner ? (
            <div className="win">+${bet.amount * 2}</div>
          ) : (
            <div className="lose">-${bet.amount * 2}</div>
          )}
        </div>
      );
    });
    return (
      <div className="history-wrapper">
        {this.props.pastBets.length === 0 ? (
          <div />
        ) : (
          <div>
            <div>Recent History</div>
            {history}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(History));
