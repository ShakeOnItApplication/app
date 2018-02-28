import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import './MakeBet/MakeBet.css';
import Nav from '../Nav/Nav';
import Bets from '../Bets/Bets';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn } from '../../ducks/reducer';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Nav state={this.props.userInfo} />
        <div className="right-side flex-column">
          <div className="">
            <Bets id={this.props.userInfo.user_id} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Home));
