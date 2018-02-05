import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import './MakeBet/MakeBet.css';
import Nav from '../Nav/Nav';
import MakeBet from './MakeBet/MakeBet';
import ProfileCard from './ProfileCard/ProfileCard';
import PendingBets from '../PendingBets/PendingBets';

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
      const name =
        response.data.first_name[0].toUpperCase() +
        response.data.first_name.substring(1, response.data.first_name.length) +
        ' ' +
        response.data.last_name[0].toUpperCase() +
        response.data.last_name.substring(1, response.data.last_name.length);
      this.setState({
        admin_user_id: response.data.user_id,
        name: name
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
        <ProfileCard name={this.state.name} />
        <div className="profile-container">
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
        <div className="feed-container general-card white shadow">
          <PendingBets id={this.state.admin_user_id} />
        </div>
      </div>
    );
  }
}
