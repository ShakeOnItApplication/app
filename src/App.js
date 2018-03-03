import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn } from './ducks/reducer';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import router from './router';

class App extends Component {
  componentDidMount() {
    console.log('mount');
    this.props.dispatch(logIn());
  }

  render() {
    console.log(this.props);
    return <div>{this.props.loggedIn ? <div>{router}</div> : <Login />}</div>;
  }
}

export default withRouter(connect(state => state)(App));
