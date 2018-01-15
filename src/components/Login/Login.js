import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true,
            showSignup: false
        }
    }
    login(info) {
        axios.post('/auth/login', info).then(response => {
            console.log(response);
        });
    }

    render() {
        return (
            <div>
                {this.state.showLogin
                    ?
                    <div>
                        <div>Username</div>
                        <input type="text" onChange={(e)=>this.setState({ username: e.target.value })} />
                        <div>Password</div>
                        <input type="text" onChange={(e)=>this.setState({ password: e.target.value })} />
                        <button onClick={()=>this.login({username: this.state.username, password: this.state.password})}>Log In</button>
                    </div>
                    :
                    <input type="text" />
                }
            </div>
        )
    }
}