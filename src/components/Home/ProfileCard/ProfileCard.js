import React, { Component } from 'react';
import './ProfileCard.css';
import GeneralCard from '../../GeneralCard/GeneralCard';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="title">{this.props.name}</div>
      </div>
    );
  }
}
