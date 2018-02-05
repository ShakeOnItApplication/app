import React, { Component } from 'react';
import axios from 'axios';
import './Bet.css';

export default class Bet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const props = this.props;
    return (
      <div className="bet-container flex-between">
        <div> {this.props.title} </div>
        <div> {this.props.amount} </div>
      </div>
    );
  }
}
