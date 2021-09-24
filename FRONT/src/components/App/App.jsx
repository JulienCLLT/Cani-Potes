import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from '../SignUp/index';

import Header from '../Header/Header';
import MapBalade from '../MapBalade';
import Connection from '../Connection/Connection';
import CreateRide from '../CreateRide/CreateRide';
import RideDetails from '../RideDetails/RideDetails';

// import './App.scss';

import '../../styles/reset.scss';

function App() {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <div className="App">

      <Switch>
        <Route exact path="/">
          {isLogged && <Redirect to="/home" />}
          <Connection />
        </Route>
        <Route exact path="/signup">
          {isLogged && <Redirect to="/home" />}
          <Header />
          <main>
            <SignUp />
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
        <Route exact path="/ride/:id">
          <Header />
          <main>
            <RideDetails />
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
