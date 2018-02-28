import React, { Component } from 'react';
import './Nav.css';
import MakeBet from '../Home/MakeBet/MakeBet';
import ProfileCard from '../Home/ProfileCard/ProfileCard';
import History from '../History/History';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../ducks/reducer';

class Nav extends Component {
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
    const name = state.first_name + ' ' + state.last_name;
    return (
      <div className="nav-container white shadow">
        <div className="nav-logo-container">
          <img
            src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX18068832.jpg"
            alt="hands"
          />
        </div>
        <ProfileCard name={name} />
        {this.state.showMakeBet && (
          <MakeBet
            hideMakeBet={this.hideMakeBet.bind(this)}
            admin_user_id={state.user_id}
            admin_info={state}
          />
        )}
        <button
          className="button-main"
          onClick={() => this.setState({ showMakeBet: true })}
        >
          Make Bet
        </button>
        <History id={state.user_id} />
        <div className="nav-link" onClick={() => this.props.dispatch(logOut())}>
          Log out
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Nav));
