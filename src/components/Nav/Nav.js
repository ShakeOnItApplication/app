import React, { Component } from 'react';
import './Nav.css';
import MakeBet from '../Home/MakeBet/MakeBet';
import ProfileCard from '../Home/ProfileCard/ProfileCard';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMakeBet: false
    };
  }

  hideMakeBet() {
    this.setState({
      showMakeBet: false
    });
  }

  render() {
    const state = this.props.state;
    return (
      <div className="nav-container white shadow">
        <div className="nav-logo-container">
          <img
            src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX18068832.jpg"
            alt="hands"
          />
        </div>
        <ProfileCard name={state.name} />
        {this.state.showMakeBet ? (
          <MakeBet
            hideMakeBet={this.hideMakeBet.bind(this)}
            admin_user_id={state.admin_user_id}
            admin_info={state.admin_info}
          />
        ) : (
          <button
            className="button-main"
            onClick={() => this.setState({ showMakeBet: true })}
          >
            Make Bet
          </button>
        )}
      </div>
    );
  }
}
