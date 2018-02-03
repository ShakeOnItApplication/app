import React, { Component } from 'react';

export default class GeneralCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        id={this.props.id}
        className="general-card flex-center-column white shadow"
      >
        {this.props.children}
      </div>
    );
  }
}
