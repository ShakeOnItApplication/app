import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Login from './components/Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogIn: true
    };
  }
  render() {
    return <div>{this.state.showLogIn ? <Login /> : <div>Hey</div>}</div>;
  }
}

export default App;
