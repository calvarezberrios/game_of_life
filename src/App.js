import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
  const [grid, setGrid] = useState(new Array(25).fill(new Array(25).fill({isAlive: false})));

  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <h3>By: Carlos "Mannie" Alvarez-Berrios</h3>

      <Grid grid = {grid} setGrid = {setGrid} />

    </div>
  );
}

export default App;
