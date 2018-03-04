import React, { Component } from 'react';
import GeneralCard from '../../GeneralCard/GeneralCard';
import { BarLoader } from 'react-spinners';

export default class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 4242424242424242,
      exp_month: 11,
      exp_year: 20,
      cvc: 275
    };
  }

  render() {
    return (
      <GeneralCard id={'registerCard'}>
        <div className="input-title">Card Number</div>
        <input
          disabled
          value={this.state.number}
          className="login-input"
          type="text"
          onChange={e => this.setState({ number: e.target.value })}
        />
        <div className="input-title">Exp. Month</div>
        <input
          disabled
          value={this.state.exp_month}
          className="login-input"
          type="text"
          onChange={e => this.setState({ exp_month: e.target.value })}
        />
        <div className="input-title">Exp. Year</div>
        <input
          disabled
          value={this.state.exp_year}
          className="login-input"
          type="text"
          onChange={e => this.setState({ exp_year: e.target.value })}
        />
        <div className="input-title">CVC</div>
        <input
          disabled
          value={this.state.cvc}
          className="login-input"
          type="text"
          onChange={e => this.setState({ cvc: e.target.value })}
        />
        {!this.props.loadingLogin ? (
          <button
            className="button-main"
            onClick={() => {
              this.props.registerUser(this.state);
            }}
          >
            Create Account
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
        <div style={{ marginTop: '20px' }}>Need to make a change?</div>
        <div
          className="link"
          onClick={() =>
            this.props.toggleLoginCard('registerCard', 'registerUser', 'right')
          }
        >
          Back
        </div>
      </GeneralCard>
    );
  }
}
