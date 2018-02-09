import React, { Component } from 'react';
import axios from 'axios';
import Bet from '../Bet/Bet';
import GeneralCard from '../GeneralCard/GeneralCard';

export default class ActiveBets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBets: []
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.getBets(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getBets(nextProps.id);
    }
  }

  getBets(id) {
    axios.post('/api/getActiveBets', { user_id: id }).then(response => {
      console.log(response);
      this.setState({
        activeBets: response.data
      });
    });
  }

  render() {
    const activeBets = this.state.activeBets.map((bet, idx) => {
      return (
        <GeneralCard key={bet.bet_id} id={'active' + bet.bet_id}>
          <Bet key={bet.bet_id} bet={bet} status={'active'} />
        </GeneralCard>
      );
    });
    return (
      <div className="flex-center-column">
        {this.state.activeBets.length > 0 && (
          <div className="pending-wrapper">
            <div className="section-title align-start">Active Bets</div>
            {activeBets}
          </div>
        )}
      </div>
    );
  }
}
