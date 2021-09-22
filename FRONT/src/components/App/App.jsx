import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import MapBalade from '../MapBalade';
import './App.scss';
import Connection from '../Connection/Connection';
import CreateRide from '../CreateRide/CreateRide';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <main>
            <Connection />
          </main>
        </Route>
        <Route exact path="/home">
          <Header />
          <main>
            <MapBalade />
          </main>
        </Route>
        <Route exact path="/ride/create">
          <Header />
          <main>
            <CreateRide />
          </main>
        </Route>
        <Route>
          <main>404 : t'es tombé sur un os !</main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
