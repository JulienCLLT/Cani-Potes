import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
//import CreateRide from '../CreateRide/CreateRide';
import NavBarConnected from '../NavBarConnected/NavBarConnected';
import Header from '../Header/Header';


function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
    </BrowserRouter> 

    
  );
}

export default App;
