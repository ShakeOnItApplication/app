import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Login from './components/Login/Login';
import router from './router';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLogIn: true
    }
  }
  render() {
    return (
      <div>
        { this.state.showLogIn
          ?
        <Login />
        :
        <div>
          { router }
        </div>
        }
      </div>
    );
  }
}

export default App;
