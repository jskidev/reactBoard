import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Create from './pages/Create'
import Home from './pages/Home'
import View from './pages/View'
import Edit from './pages/Edit'
import Board from './pages/Board'
import My404 from './pages/My404'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <span>
              <p>LeadTheBoard</p>
            </span>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/view/:id" children={<View />} />
          <Route path="/edit/:id" children={<Edit />} />
          <Route path="/board/:id" children={<Board />} />
          <Route path='/404' exact children={<My404 />} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
