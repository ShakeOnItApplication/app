import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import Nav from '../Nav/Nav';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: ''
    };
  }

  componentDidMount() {
    axios.get('/user/session').then(response => {
      this.setState({
        first_name: response.data.first_name
      });
    });
  }

  render() {
    return (
      <div className="flex-center">
        <Nav />Welcome back, {this.state.first_name}
      </div>
    );
  }
}
