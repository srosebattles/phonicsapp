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
            <li className="navItem"><Link to={'/1'}>Level One: S A T I P</Link></li>
            <li className="navItem"><Link to={'/2'}>Level Two: N CK E H R</Link></li>
            <li className="navItem"><Link to={'/3'}>Level Three: M D G O U</Link></li>
            <li className="navItem"><Link to={'/4'}>Level Four: L F B J Z</Link></li>
            <li className="navItem"><Link to={'/5'}>Level Five: W V Y Q X</Link></li>
            <li className="navItem"><Link to={'/6'}>Level Six: A E I O U</Link></li>
            <li className="navItem"><Link to={'/7'}>Level Seven: B D P Q</Link></li>
            <li className="navItem"><Link to={'/8'}>Level Eight: SH CH TH</Link></li>
            <li className="navItem"><Link to={'/9'}>Level Nine: AI EE IE OO UE</Link></li>
            <li className="navItem"><Link to={'/10'}>Level Ten: AR OR ER</Link></li>
          </ul>
        </div>
        <div className="interactDiv">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
