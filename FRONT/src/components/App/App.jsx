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
import Profile from '../Profile';
import CaniCrew from '../CaniCrew/index';
import Legals from '../Legals/index';
import Error from '../Error/index';

// import './App.scss';

import '../../styles/reset.scss';

function App() {
  const { isLogged, id } = useSelector((state) => state.user);
  const { member_id } = useSelector((state) => state.profile);

  return (
    <div className="App">

      <Switch>

        <Route exact path="/">
          {isLogged ? (
            <Redirect to="/home" />
          ) : (
            <Connection />
          )}
        </Route>

        <Route exact path="/signup">
          <>
            <Header />
            <main>
              <SignUp />
            </main>
          </>
        </Route>

        <Route exact path="/home">
          {!isLogged ? (
            <Redirect to="/" />
          ) : (
            <>
              <Header title="Map balade" />
              <main>
                <MapBalade />
              </main>
            </>
          )}
        </Route>

        <Route exact path="/board">
          {!isLogged ? (
            <Redirect to="/" />
          ) : (
            <>
              <Header title="Tableau de bord" />
              <main>
                <DashBoard />
              </main>
            </>
          )}
        </Route>

        <Route exact path="/ride/create">
          {!isLogged ? (
            <Redirect to="/" />
          ) : (
            <>
              <Header title="Créer une balade" />
              <main>
                <CreateRide />
              </main>
            </>
          )}
        </Route>

        <Route exact path="/ride/:id">
          {!isLogged ? (
            <Redirect to="/" />
          ) : (<RideDetails />)}
        </Route>

        <Route exact path="/profile/:id">
          {!isLogged ? (
            <Redirect to="/" />
          ) : (
            <>
              <Header title={id === member_id ? 'Mon profil' : 'Profil'} />
              <main>
                <Profile />
              </main>
            </>
          )}
        </Route>

        <Route exact path="/cani-crew">
          <CaniCrew />
        </Route>

        <Route exact path="/legal">
          <Legals />
        </Route>

        <Route>
          <Error />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
