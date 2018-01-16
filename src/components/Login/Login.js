import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
    }
    login(info) {
        axios.post('/auth/login', info).then(response => {
            console.log(response);
        });
    }
    registerUser(info) {
        axios.post('/api/registerUser', info).then(res => {
            console.log(res);
        })
    }

    render() {
        return (
            <div className="flex-center">
                {this.state.showLogin
                    ?
                    <div>
                        <div>Username</div>
                        <input type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                        <div>Password</div>
                        <input type="text" onChange={(e) => this.setState({ password: e.target.value })} />
                        <button onClick={() => this.login({ username: this.state.username, password: this.state.password })}>Log In</button>
                        <div onClick={()=> this.setState({ showLogin: false }) }>Create Account</div>
                    </div>
                    :
                    <div>
                        <div>Username</div>
                        <input type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                        <div>Password</div>
                        <input type="text" onChange={(e) => this.setState({ password: e.target.value })} />
                        <div>Email</div>
                        <input type="text" onChange={(e) => this.setState({ email: e.target.value })} />
                        <div>First Name</div>
                        <input type="text" onChange={(e) => this.setState({ first_name: e.target.value })} />
                        <div>Last Name</div>
                        <input type="text" onChange={(e) => this.setState({ last_name: e.target.value })} />
                        <button onClick={() => this.registerUser({ username: this.state.username, password: this.state.password, email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name })}>Register</button>
                        <div onClick={()=> this.setState({ showLogin: true }) }>Log In</div>
                    </div>
                }
            </div>
        )
    }
}