import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn, registerLogin } from '../../ducks/reducer';
import './Login.css';
import RegisterUser from './RegisterUser/RegisterUser';
import RegisterCard from './RegisterUser/RegisterCard';
import LoginCard from './LoginCard';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInfo: {},
      registerCardInfo: {},
      formErrors: { email: 'Invalid Email Format', password: 'Enter Password' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      loadingLogin: false
    };
  }

  login(info) {
    this.setState({ loadingLogin: true });
    axios.post('/auth/login', info).then(response => {
      if (response.data.user_id) {
        this.props.dispatch(logIn(true));
      }
    });
  }

  registerUser(info) {
    this.setState(
      { registerCardInfo: info, loadingLogin: true },
      function afterStateChange() {
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
              this.login({
                email: this.state.registerInfo.email,
                password: this.state.registerInfo.password
              });
            }
          });
      }
    );
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
    return (
      <div className="flex-center login-wrapper">
        <LoginCard
          toggleLoginCard={this.toggleLoginCard}
          login={this.login.bind(this)}
          loadingLogin={this.state.loadingLogin}
        />
        <RegisterUser
          toggleLoginCard={this.toggleLoginCard}
          registerInfo={this.registerInfo.bind(this)}
        />
        <RegisterCard
          toggleLoginCard={this.toggleLoginCard}
          registerUser={this.registerUser.bind(this)}
          loadingLogin={this.state.loadingLogin}
        />
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Login));
