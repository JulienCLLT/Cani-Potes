/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import MapBalade from '../MapBalade';
import Connection from '../Connection/Connection';
import CreateRide from '../CreateRide/CreateRide';
import SignUp from '../SignUp/index';
import RideDetails from '../RideDetails/RideDetails';
import DashBoard from '../DashBoard/DashBoard';
import SearchBar from '../SignUp/SearchBar';

// import './App.scss';

import '../../styles/reset.scss';
import Profile from '../Profile';

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
          {/* {isLogged && <Redirect to="/home" />} */}
          <Header />
          <main>
            <SignUp />
          </main>
        </Route>
        <Route exact path="/home">
          {!isLogged && <Redirect to="/" />}
          <Header title="Map balade" />
          <main>
            <MapBalade />
          </main>
        </Route>
        <Route exact path="/board">
          {!isLogged && <Redirect to="/" />}
          <Header title="Tableau de bord" />
          <main>
            <DashBoard />
          </main>
        </Route>
        <Route exact path="/ride/create">
          {!isLogged && <Redirect to="/" />}
          <Header title="Créer une balade" />
          <main>
            <CreateRide />
          </main>
        </Route>
        <Route exact path="/ride/:id">
          {!isLogged && <Redirect to="/" />}
          <Header title="Détails une balade" />
          <main>
            <RideDetails />
          </main>
        </Route>
        <Route exact path="/profile/:id">
          {!isLogged && <Redirect to="/" />}
          <Header title="Détails d'un profil" />
          <main>
            <Profile />
          </main>
        </Route>
        <Route exact path="/search">
          <main>
            <SearchBar title="Recherche" placeholder="Race" />
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
