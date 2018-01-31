import React, { Component } from 'react';

export default class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        id="registerCard"
        className="flex-center-column shadow general-card white"
      >
        <div className="input-title">Card Number</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ number: e.target.value })}
        />
        <div className="input-title">Exp. Month</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ exp_month: e.target.value })}
        />
        <div className="input-title">Exp. Year</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ exp_year: e.target.value })}
        />
        <div className="input-title">CVC</div>
        <input
          className="login-input"
          type="text"
          onChange={e => this.setState({ cvc: e.target.value })}
        />
        <button
          className="button-main"
          onClick={() => {
            this.props.registerUser(this.state);
          }}
        >
          Create Account
        </button>
        <div style={{ marginTop: '20px' }}>Need to make a change?</div>
        <div
          className="link"
          onClick={() =>
            this.props.toggleLoginCard('registerCard', 'registerUser', 'right')
          }
        >
          Back
        </div>
      </div>
    );
  }
}
