import React, { Component } from 'react';
import GeneralCard from '../GeneralCard/GeneralCard';
import { BarLoader } from 'react-spinners';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GeneralCard id={'login'}>
        <div className="input-title">Email</div>
        <input
          autoFocus
          className="login-input"
          type="email"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <div className="input-title">Password</div>
        <input
          className="login-input"
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        {!this.props.loadingLogin ? (
          <button
            className="button-main"
            onClick={() =>
              this.props.login({
                email: this.state.email,
                password: this.state.password
              })
            }
          >
            Log In
          </button>
        ) : (
          <button className="button-main">
            <BarLoader
              loading={this.props.loadingLogin}
              height={20}
              color={'#FFFFFF'}
            />
          </button>
        )}
        <div style={{ marginTop: '20px' }}>Don't have an account?</div>
        <div
          className="link"
          onClick={() =>
            this.props.toggleLoginCard('login', 'registerUser', 'left')
          }
        >
          Create Account
        </div>
      </GeneralCard>
    );
  }
}
