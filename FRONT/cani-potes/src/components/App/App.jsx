import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
//import CreateRide from '../CreateRide/CreateRide';
import NavBarConnected from '../NavBarConnected/NavBarConnected';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarConnected />
      </div>
    </BrowserRouter> 

    
  );
}

export default App
