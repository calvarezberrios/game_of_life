import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';



function App() {
  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <h3>By: Carlos "Mannie" Alvarez-Berrios</h3>

      <Grid cols = {25} rows = {25} />

    </div>
  );
}

export default App;
