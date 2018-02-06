import React, { Component } from 'react';
import axios from 'axios';
import './PendingBets.css';
import Bet from '../Bet/Bet';

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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getBets(nextProps.id);
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
      return <Bet key={idx} title={bet.bet_title} amount={bet.amount} />;
    });
    return <div>{pendingBets}</div>;
  }
}
