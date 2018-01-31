import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import Nav from '../Nav/Nav';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      pending_users: []
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

  findUser() {
    document.getElementById('user-list').style.display = 'initial';
    const name = this.state.pending_user;
    const first_name = name.substring(0, name.indexOf(' '));
    const last_name = name.substring(name.indexOf(' ') + 1, name.length);
    axios.post('/api/findUser', { first_name, last_name }).then(response => {
      console.log(response);
      this.setState({
        pending_users: response.data
      });
    });
  }

  setPendingUser(user) {
    this.setState({ pending_user: user.user_id });
    document.getElementById('pending-user').value =
      user.first_name + ' ' + user.last_name;
    document.getElementById('user-list').style.display = 'none';
  }

  proposeBet() {
    axios
      .post('/api/placeBet', {
        admin_user_id: this.state.admin_user_id,
        receiver_user_id: this.state.pending_user,
        amount: this.state.amount,
        bet_title: this.state.title
      })
      .then(response => {
        console.log(response);
      });
  }

  render() {
    const pending_users = this.state.pending_users.map((user, idx) => {
      return (
        <div
          className="dropdown-option"
          key={idx}
          onClick={() => this.setPendingUser(user)}
        >
          {user.first_name}&nbsp;{user.last_name}
        </div>
      );
    });
    console.log(this.state);
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
          <div className="general-card white shadow">
            <div className="title">Make Bet</div>
            <div className="input-title">Against Who?</div>
            <input
              id="pending-user"
              className="login-input"
              type="text"
              onChange={e => this.setState({ pending_user: e.target.value })}
            />
            <div id="user-list">{pending_users}</div>
            <button className="button-main" onClick={() => this.findUser()}>
              Find User
            </button>
            <div className="input-title">On What?</div>
            <input
              className="login-input"
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <div className="input-title">How much are you proposing?</div>
            <input
              className="login-input"
              type="text"
              onChange={e => this.setState({ amount: e.target.value })}
            />
            <button className="button-main" onClick={() => this.proposeBet()}>
              Propose Bet
            </button>
          </div>
        </div>
        <div className="feed-container general-card white shadow" />
      </div>
    );
  }
}
