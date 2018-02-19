import React, { Component } from 'react';
import axios from 'axios';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.getHistory(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.getHistory(nextProps.id);
    }
  }

  getHistory(id) {
    axios.post('/api/getRecentHistory', { id }).then(response => {
      console.log(response);
      this.setState({
        history: response.data
      });
    });
  }

  render() {
    const history = this.state.history.map((bet, idx) => {
      return <div key={bet.bet_id}>{bet.bet_title}</div>;
    });
    return (
      <div>
        <div>Recent History</div>
        {history}
      </div>
    );
  }
}
