import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import NoMatch from './NoMatch'
import LevelOne from './LevelOne'
import LevelTwo from './LevelTwo'

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={LevelOne} />
      <Route path="1" component={LevelOne} />
      <Route path="2" component={LevelTwo} />
      <Route path="*" component={NoMatch} />
    </Route>

  </Router>,
  document.getElementById('root')
);
