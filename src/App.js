import React, { useState } from 'react';
import './App.css';
import styled from "styled-components";

const Cell = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  margin-top: -10px;
  margin-left: -1px;
  background: ${props => props.isAlive ? "#ffffff" : "#cccccc"}
`;

function App() {
  // Create state for cell grid, 25 x 25 with each cell set to value 0
  const [grid, setGrid] = useState(new Array(25*25).fill({
    isAlive: false,
    value: ""
  }));

  function setIsAlive(cellIndex) {
    setGrid(grid.map((cell, index) => {
      if(index === cellIndex) {
        return {
          ...cell,
          isAlive: !cell.isAlive
        }
      }
      return cell;
    }))
  }

  return (
    <div className="App">
      <h1>Conway's Game Of Life</h1>
      <h3>By: Carlos "Mannie" Alvarez-Berrios</h3>

      {/* Map out the grid and display on screen */}
      {grid.map((cell, index) => {
        // setting the rows to 25 cells, once reaches 25th cell it breaks to a new line
        if(index % 25 != 0) {
          return <Cell isAlive = {cell.isAlive} onClick = {() => setIsAlive(index)}>{cell.value}</Cell>
        } else {
          return <><br /><Cell isAlive = {cell.isAlive} onClick = {() => setIsAlive(index)}>{cell.value}</Cell></>
        }
        
        

      })}
    </div>
  );
}

export default App;
