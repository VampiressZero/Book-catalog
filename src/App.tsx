import React from 'react';
import logo from './logo.svg';
import './App.css';
import { firebase } from './config/FirebaseConfig';
import { HomePage } from './page/HomePage/organoids/HomePage';


const App = () => {
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;


