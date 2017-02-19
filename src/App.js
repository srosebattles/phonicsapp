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
            <h1>Levels</h1>
            <br />
            <li className="navItem"><Link to={'/1'}>One: S A T I P</Link></li>
            <li className="navItem"><Link to={'/2'}>Two: N CK E H R</Link></li>
            <li className="navItem"><Link to={'/3'}>Three: M D G O U</Link></li>
            <li className="navItem"><Link to={'/4'}>Four: L F B J Z</Link></li>
            <li className="navItem"><Link to={'/5'}>Five: W V Y Q X</Link></li>
            <li className="navItem"><Link to={'/6'}>Six: A E I O U</Link></li>
            <li className="navItem"><Link to={'/7'}>Seven: B D P Q</Link></li>
            <li className="navItem"><Link to={'/8'}>Eight: SH CH TH</Link></li>
            <li className="navItem"><Link to={'/9'}>Nine: AI EE IE OO OU UE</Link></li>
            <li className="navItem"><Link to={'/10'}>Ten: AR OR ER</Link></li>
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
