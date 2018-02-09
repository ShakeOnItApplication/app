import React, { Component } from 'react';
import axios from 'axios';
import PendingBets from '../PendingBets/PendingBets';
import ActiveBets from '../ActiveBets/ActiveBets';

export default class Bets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_id: this.props.id
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ admin_user_id: this.props.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ admin_user_id: nextProps.id });
    }
  }

  render() {
    return (
      <div>
        <PendingBets id={this.state.admin_user_id} />
        <ActiveBets id={this.state.admin_user_id} />
      </div>
    );
  }
}
