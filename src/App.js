import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router';
require('unique-random-array')

class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="navDiv">
          <ul className="nav">
            <li className="navItem"><Link to={'/1'}>Level One</Link></li>
            <li className="navItem"><Link to={'/2'}>Level Two</Link></li>
          </ul>
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default App;
