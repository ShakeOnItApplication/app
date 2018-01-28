import React, { Component } from 'react';
import './Nav.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="nav-container">
        <div className="nav-logo-container">
          <img
            src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX18068832.jpg"
            alt="hands"
          />
        </div>
        <div className="nav-link">Settings</div>
      </div>
    );
  }
}
