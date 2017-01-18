import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import NoMatch from './NoMatch';
import LevelOne from './LevelOne';
import LevelTwo from './LevelTwo';
import LevelThree from './LevelThree';
import LevelFour from './LevelFour';
import LevelFive from './LevelFive';
import LevelSix from './LevelSix';
import LevelSeven from './LevelSeven';
import LevelEight from './LevelEight';
import LevelNine from './LevelNine';
import LevelTen from './LevelTen';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={LevelOne} />
      <Route path="1" component={LevelOne} />
      <Route path="2" component={LevelTwo} />
      <Route path="3" component={LevelThree} />
      <Route path="4" component={LevelFour} />
      <Route path="5" component={LevelFive} />
      <Route path="6" component={LevelSix} />
      <Route path="7" component={LevelSeven} />
      <Route path="8" component={LevelEight} />
      <Route path="9" component={LevelNine} />
      <Route path="10" component={LevelTen} />

      <Route path="*" component={NoMatch} />
    </Route>

  </Router>,
  document.getElementById('root')
);
