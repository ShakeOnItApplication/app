import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import './MakeBet/MakeBet.css';
import Nav from '../Nav/Nav';
import Bets from '../Bets/Bets';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/user/session').then(response => {
      const first_name =
        response.data.first_name[0].toUpperCase() +
        response.data.first_name.substring(1, response.data.first_name.length);
      const last_name =
        response.data.last_name[0].toUpperCase() +
        response.data.last_name.substring(1, response.data.last_name.length);
      this.setState({
        admin_user_id: response.data.user_id,
        name: first_name + ' ' + last_name,
        admin_info: {
          first_name,
          last_name
        }
      });
    });
  }

  render() {
    return (
      <div className="home-container">
        <Nav state={this.state} />
        <div className="right-side flex-column">
          <div className="">
            <Bets id={this.state.admin_user_id} />
          </div>
        </div>
      </div>
    );
  }
}
