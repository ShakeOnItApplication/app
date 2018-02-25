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
        <div className="history" key={bet.bet_id}>
          {bet.bet_title}
        </div>
      );
    });
    return (
      <div className="history-wrapper">
        <div>Recent History</div>
        {history}
      </div>
    );
  }
}

export default withRouter(connect(state => state)(History));
