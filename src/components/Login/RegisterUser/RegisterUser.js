import React, { Component } from 'react';
import GeneralCard from '../../GeneralCard/GeneralCard';

export default class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    };
  }

  render() {
    return (
      <GeneralCard id={'registerUser'}>
        <div className="input-title">Email</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <div className="input-title">Password</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ password: e.target.value })}
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
          onClick={() => {
            this.props.registerInfo(this.state);
            this.props.toggleLoginCard('registerUser', 'registerCard', 'left');
          }}
        >
          Add Payment Method
        </button>
        <div style={{ marginTop: '20px' }}>Already have an account?</div>
        <div
          className="link"
          onClick={() =>
            this.props.toggleLoginCard('registerUser', 'login', 'right')
          }
        >
          Log In
        </div>
      </GeneralCard>
    );
  }
}
