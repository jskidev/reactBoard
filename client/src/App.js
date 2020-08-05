import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Create from './pages/Create'
import Home from './pages/Home'
import View from './pages/View'
import Edit from './pages/Edit'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/view/:id" children={<View />} />
          <Route path="/edit/:id" children={<Edit />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
