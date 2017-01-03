import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import NoMatch from './NoMatch'
import LevelOne from './LevelOne'
import LevelTwo from './LevelTwo'
import LetterA from './AlphabetSoup'
import ExampleContainer from './ExampleContainer'

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={LevelOne} />
      <Route path="1" component={LevelOne} />
      <Route path="2" component={LevelTwo} />
      <Route path="*" component={NoMatch} />
      <Route path="example" component={ExampleContainer} />
    </Route>

  </Router>,
  document.getElementById('root')
);
