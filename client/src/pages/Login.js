import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
    this.logInWithUser = this.logInWithUser.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  logInWithUser(e) {
    e.preventDefault();
    const user = { username: this.state.username, password: this.state.password }
    axios.post('http://localhost:8080/login', user)
    .then((data) => {
      localStorage.setItem('uuID', data.data._id);
      setTimeout(() => {
        window.location = '/posts';
      });
    })
    .catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <form className="Login-form">
            <FormGroup className="Login-group" controlId="formHorizontalEmail">
              Please enter your username
              <FormControl 
                id="formHorizontalEmail"
                className="form-control"
                onChange={this.updateUsername}
                placeholder='Username'
                type="text"
                value={this.state.username}
              />
            </FormGroup>
            <FormGroup className="Login-group" controlId="formHorizontalPassword">
              Please enter your password
              <FormControl
                id="formHorizontalPassword"
                className="form-control" 
                onChange={this.updatePassword}
                placeholder='Password'
                type="password"
                value={this.state.password}
              />
              <button clasName="btn btn-default" onClick={this.logInWithUser}>Login</button>
               <h3>Don't have an account?</h3>
              <Link to="/create-user">Sign up here!</Link>
              <br />
            </FormGroup>
          </form>
        </div>
      </div>
    )
  }
}
