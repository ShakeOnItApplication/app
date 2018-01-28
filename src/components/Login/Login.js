import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn } from '../../ducks/reducer';
import './Login.css';
import RegisterUser from './RegisterUser/RegisterUser';
import RegisterCard from './RegisterUser/RegisterCard';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registerInfo: {},
      registerCardInfo: {}
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
    this.setState({ registerCardInfo: info }, function afterStateChange() {
      axios
        .post('/api/registerUser', {
          email: this.state.registerInfo.email,
          password: this.state.registerInfo.password,
          first_name: this.state.registerInfo.first_name,
          last_name: this.state.registerInfo.last_name,
          number: this.state.registerCardInfo.number,
          exp_month: this.state.registerCardInfo.exp_month,
          exp_year: this.state.registerCardInfo.exp_year,
          cvc: this.state.registerCardInfo.cvc
        })
        .then(response => {
          if (response.data.user_id) {
            this.props.logIn(true);
          }
        });
    });
  }

  registerInfo(info) {
    this.setState({ registerInfo: info });
  }

  toggleLoginCard(hide, show, direction) {
    if (direction === 'left') {
      document.getElementById(hide).style.transform = 'translateX(-100vw)';
      document.getElementById(show).style.transform = 'translateX(0)';
    } else {
      document.getElementById(hide).style.transform = 'translateX(100vw)';
      document.getElementById(show).style.transform = 'translateX(0)';
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="flex-center login-wrapper">
        <div id="login" className="flex-center-column general-card white">
          <div className="input-title">Email</div>
          <input
            className="login-input"
            type="text"
            onChange={e => this.setState({ email: e.target.value })}
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
                email: this.state.email,
                password: this.state.password
              })
            }
          >
            Log In
          </button>
          <div
            className="link"
            onClick={() =>
              this.toggleLoginCard('login', 'registerUser', 'left')
            }
          >
            Create Account
          </div>
        </div>
        <RegisterUser
          toggleLoginCard={this.toggleLoginCard}
          registerInfo={this.registerInfo.bind(this)}
        />
        <RegisterCard
          toggleLoginCard={this.toggleLoginCard}
          registerUser={this.registerUser.bind(this)}
        />
      </div>
    );
  }
}

export default withRouter(connect(null, { logIn })(Login));
