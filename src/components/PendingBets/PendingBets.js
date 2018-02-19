import React, { Component } from 'react';
import axios from 'axios';
import './PendingBets.css';
import Bet from '../Bet/Bet';
import GeneralCard from '../GeneralCard/GeneralCard';

export default class PendingBets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingBets: []
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.getBets(this.props.id);
      this.setState({
        user_id: this.props.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getBets(nextProps.id);
      this.setState({
        user_id: nextProps.id
      });
    }
  }

  getBets(id) {
    axios.post('/api/getPendingBets', { user_id: id }).then(response => {
      console.log(response);
      this.setState({
        pendingBets: response.data
      });
    });
  }

  render() {
    const pendingBets = this.state.pendingBets.map((bet, idx) => {
      return (
        <GeneralCard key={bet.bet_id} id={'pending' + bet.bet_id}>
          <Bet
            key={bet.bet_id}
            userId={this.state.user_id}
            bet={bet}
            status={'pending'}
          />
        </GeneralCard>
      );
    });
    return (
      <div className="flex-center-column">
        {this.state.pendingBets.length > 0 && (
          <div className="pending-wrapper">
            <div className="section-title align-start">Pending Bets</div>
            {pendingBets}
          </div>
        )}
      </div>
    );
  }
}
