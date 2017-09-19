import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import * as Pages from './pages';


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
  }

  componentWillMount() {
    if (localStorage.getItem('uuID')) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
  }

  logout() {
    localStorage.setItem('uuID', '');
    window.location = '/';
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="wrapper">
        <div>
          { loggedIn ? 
            <div className="Inline-button">
              <button 
                className="btn btn-primary btn-sm"
                onClick={this.logout}
              >
              </button>
            </div> : null
          }
        </div>
        <Route path="/" exact component={Pages.Login}></Route>
        <Route path="/create-user" component={Pages.CreateAccount}></Route>
        <Route path="/photos" exact component={Pages.Photos}></Route>
        <Route path="/photos/:id" component={Pages.SinglePhoto}></Route>
        <Route path="/new-photo" component={Pages.AddPhoto}></Route>
      </div>
    )
  }
}
export default App;
