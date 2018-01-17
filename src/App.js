import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loggedIn } from './ducks/reducer';

import Login from './components/Login/Login';
import router from './router';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.loggedIn ? <div>{router}</div> : <Login />}</div>;
  }
}

export default withRouter(connect(state => state, null)(App));
