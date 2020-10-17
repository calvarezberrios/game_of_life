import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import { life } from './presets';

function App() {
  
  const [gridSize, setGridSize] = useState(25)
  const [grid, setGrid] = useState(life);

  useEffect(() => setGrid(new Array(gridSize).fill(new Array(gridSize).fill({isAlive: false}))), [gridSize])

  useEffect(() => {
    setGrid(life);
  }, []);

  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <h3>By: Carlos "Mannie" Alvarez-Berrios</h3>

      <Grid grid = {grid} setGrid = {setGrid} setGridSize = {setGridSize} />

    </div>
  );
}

export default App;
