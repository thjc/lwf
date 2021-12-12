import React from 'react';
import logo from './logo.svg';
import { Board } from './features/board/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Board />
    </div>
  );
}

export default App;
