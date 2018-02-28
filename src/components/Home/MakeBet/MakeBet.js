import React, { Component } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import './MakeBet.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPendingBets } from '../../../ducks/reducer';

class MakeBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending_users: [],
      pending_user: null,
      admin_user_id: this.props.admin_user_id,
      admin_info: this.props.admin_info
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        admin_user_id: nextProps.admin_user_id,
        admin_info: nextProps.admin_info
      });
    }
  }

  findUser() {
    document.getElementById('user-list').style.display = 'initial';
    const name = this.state.pending_user;
    const first_name =
      name[0].toUpperCase() + name.substring(1, name.indexOf(' '));
    const last_name = name.substring(name.indexOf(' ') + 1, name.length);
    axios
      .post('/api/findUser', {
        first_name,
        last_name:
          last_name[0].toUpperCase() + last_name.substring(1, last_name.length)
      })
      .then(response => {
        console.log(response);
        this.setState({
          pending_users: response.data
        });
      });
  }

  setPendingUser(user) {
    const opponent_info = {
      first_name: user.first_name,
      last_name: user.last_name
    };
    this.setState({
      opponent_user_id: user.user_id,
      opponent_info: JSON.stringify(opponent_info)
    });
    document.getElementById('pending-user').value =
      user.first_name + ' ' + user.last_name;
    document.getElementById('user-list').style.display = 'none';
  }

  proposeBet() {
    axios
      .post('/api/stripe/placeBet', {
        admin_user_id: this.state.admin_user_id,
        opponent_user_id: this.state.opponent_user_id,
        admin_info: JSON.stringify(this.state.admin_info),
        opponent_info: this.state.opponent_info,
        amount: this.state.amount,
        bet_title: this.state.title
      })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          this.props.hideMakeBet();
          this.props.dispatch(getPendingBets(this.props.userInfo.user_id));
        } else {
        }
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
    return (
      <div className="modal-wrapper" id="make-bet">
        <div className="modal">
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
          <div className="nav-link" onClick={this.props.hideMakeBet}>
            Close
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(MakeBet));
