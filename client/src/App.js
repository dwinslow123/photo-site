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
              Logout
              </button>
            </div> : null
          }
        </div>
        <Route path="/" exact component={ Pages.Login }></Route>
        <Route path="/create-user" component={ Pages.CreateAccount }></Route>
        <Route path="/posts" exact component={ Pages.BlogPosts }></Route>
        <Route path="/posts/:id" component={ Pages.SinglePost }></Route>
        <Route path="/new-post" component={ Pages.AddPost }></Route>
      </div>
    )
  }
}
export default App;
