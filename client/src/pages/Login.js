import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup className="Login-group" controlId="formHorizontalEmail">
            Please enter your username
            <FormControl 
              id="formHorizontalEmail"
              className="form-control"
              onChange={this.updateUsername}
              placeholder='Username'
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup className="Login-group" controlId="formHorizontalPassword">
            <FormControl
              id="formHorizontalPassword"
              className="form-control" 
              onChange={this.updatePassword}
              placeholder='Password'
              value={this.state.password}
            />
            <Link to="/create-user">Don't have an account? Sign up here!</Link>
            <br />
            <button clasName="btn btn-default" onClick={this.logInWithUser}>Login</button>
          </FormGroup>
        </form>
      </div>
    )
  }
}
