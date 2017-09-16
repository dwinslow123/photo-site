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
      <div>
        <div>
          <h3>Hello World!</h3>
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
      </div>
    )
  }
}
export default App;
