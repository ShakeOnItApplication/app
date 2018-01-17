import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn } from '../../ducks/reducer';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    };
  }

  login(info) {
    axios.post('/auth/login', info).then(response => {
      console.log(response);
      if (response.data.user_id) {
        this.props.logIn(true);
      }
    });
  }

  registerUser(info) {
    axios.post('/api/registerUser', info).then(response => {
      if (response.data.user_id) {
        this.props.logIn(true);
      }
    });
  }

  hideLogin() {
    document.getElementById('login').style.transform = 'translateX(-100vw)';
    document.getElementById('registerUser').style.transform = 'translateX(0)';
    this.setState({ showLogin: true });
  }

  hideRegisterUser() {
    document.getElementById('login').style.transform = 'translateX(0)';
    document.getElementById('registerUser').style.transform =
      'translateX(100vw)';
    this.setState({ showLogin: false });
  }

  render() {
    return (
      <div className="flex-center login-wrapper">
        <div id="login" className="flex-center-column general-card white">
          <div className="input-title">Username</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <div className="input-title">Password</div>
          <input
            className="login-input"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button
            className="button-main"
            onClick={() =>
              this.login({
                username: this.state.username,
                password: this.state.password
              })
            }
          >
            Log In
          </button>
          <div className="link" onClick={() => this.hideLogin()}>
            Create Account
          </div>
        </div>
        <div
          id="registerUser"
          className="flex-center-column general-card white"
        >
          <div className="input-title">Username</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <div className="input-title">Password</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <div className="input-title">Email</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <div className="input-title">First Name</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ first_name: e.target.value })}
          />
          <div className="input-title">Last Name</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ last_name: e.target.value })}
          />
          <button
            className="button-main"
            onClick={() =>
              this.registerUser({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name
              })
            }
          >
            Create Account
          </button>
          <div className="link" onClick={() => this.hideRegisterUser()}>
            Log In
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { logIn })(Login));
