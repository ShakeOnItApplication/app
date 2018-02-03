import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import Nav from '../Nav/Nav';
import MakeBet from './MakeBet/MakeBet';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      showMakeBet: false
    };
  }

  componentDidMount() {
    axios.get('/user/session').then(response => {
      console.log(response);
      this.setState({
        admin_user_id: response.data.user_id,
        first_name:
          response.data.first_name[0].toUpperCase() +
          response.data.first_name.substring(
            1,
            response.data.first_name.length
          ),
        last_name:
          response.data.last_name[0].toUpperCase() +
          response.data.last_name.substring(1, response.data.last_name.length)
      });
    });
  }

  hideMakeBet() {
    this.setState({
      showMakeBet: false
    });
  }

  render() {
    return (
      <div className="flex-center home-container">
        <Nav />
        <div className="profile-container">
          <div className="general-card profile-card">
            <div className="title">
              {this.state.first_name}&nbsp;{this.state.last_name}
            </div>
            <div>Account Balance: $35</div>
          </div>
          {this.state.showMakeBet ? (
            <MakeBet
              hideMakeBet={this.hideMakeBet.bind(this)}
              admin_user_id={this.state.admin_user_id}
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
        <div className="feed-container general-card white shadow" />
      </div>
    );
  }
}
