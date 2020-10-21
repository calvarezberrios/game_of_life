import React, { useCallback, useRef, useState } from 'react';
import produce from "immer";
import styled from "styled-components";
import nextGen from '../utils/nextGen';
import Cell from "./Cell";
import lifeImg from "../assets/images/life.png";
import alienImg from "../assets/images/alien.png";
import pacmanImg from "../assets/images/pacman.png";
import skullImg from "../assets/images/skull.png";
import { life, alien, skull, pacman } from '../presets';
import findNeighbors from '../utils/findNeighbors';



const operations = [
    [0, 1],
    [1, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];



const Grid = () => { 
    const [size, setSize] = useState(25);
    const [grid, setGrid] = useState(life); 
    const [gen, setGen] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(100);

    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    // Toggle isAlive on clicked cell
    function setIsAlive(col, row) {  
        if(!isPlaying) { 

            setGrid(grid => produce(grid, copy => {copy[col][row].isAlive = !copy[col][row].isAlive}));

            setGen(0);
        }
    }  

    const moveToNextGen = useCallback(() => {
        
        setGrid(grid => produce(grid, copy => {
            for(let c = 0; c < grid.length; c++){
                for(let r = 0; r < grid[0].length; r++) {
                    let neighbors = 0;

                    operations.forEach(([x, y]) => {
                        const newI = c + x;
                        const newJ = r + y;
                        if((newI >= 0 && newI < grid.length) && (newJ >= 0 && newJ < grid[0].length) && grid[newI][newJ].isAlive) {
                            neighbors += 1;
                        }
                    })
        
                    if(neighbors < 2 || neighbors > 3) {
                        copy[c][r].isAlive = false;
                    } else if (!grid[c][r].isAlive && neighbors === 3) {
                        copy[c][r].isAlive = true;
                    }
                }
            }
        }));

        setGen(gen => gen + 1)

    }, []);

    const runSimulation = useCallback(() => {
        if(!isPlayingRef.current) {
            return;
        }

        moveToNextGen()

        setTimeout(runSimulation, speed);
    }, []);

    function clearGrid() {
        setIsPlaying(false);
        setGrid(Array.from({ length: size }).map(() => Array.from({ length: size }).fill({ isAlive: false })));
        setGen(0);
        setSpeed(100);
    }



    return (
        <div>
            <div>
                <h4>Generation: {gen}</h4>
                <button onClick ={() => {
                    setIsPlaying(!isPlaying)
                    if(!isPlaying) {
                        isPlayingRef.current = true;
                        runSimulation();
                    }
                }}>{isPlaying ? "Stop" : "Play"}</button>
                <button disabled = {isPlaying} onClick = {moveToNextGen}>Next</button>
                <button disabled = {isPlaying} onClick = {clearGrid}>clear</button>
                <button onClick = {() => {setSpeed(1000);}}>slow</button>
                <button onClick = {() => {setSpeed(25);}}>fast</button>
                <br />
                <label htmlFor = "gridSize">Grid Size: </label>
                <select id = "gridSize" onChange = {(e) => {
                        setSize(e.target.value)
                        setGrid(Array.from({ length: parseInt(e.target.value) }).map(() => Array.from({ length: parseInt(e.target.value) }).fill({ isAlive: false })));
                        e.target.value = "";
                    }}>
                    <option value = "">Change Grid Size</option>
                    <option value = {25}>25x25</option>
                    <option value = {50} >50x50</option>
                </select>

            </div>           
            {/* Map out the grid and display on screen */}
            <GridContainer size = {size}>          
                {/* Map out the grid and display on screen */}
                {grid.map((cols, col) => {
                    return cols.map((cell, row) => {
                        return <Cell key = {`${col}-${row}`} isPlaying = {isPlaying} grid = {grid} setGrid = {setGrid} col = {col} row = {row} isAlive = {cell.isAlive} />
                    })
                })}
            </GridContainer>
            

            <br />

            <button onClick = {() => {setSize(25); setGrid(life); setGen(0);}}><img src = {lifeImg} width = "75" height = "75" alt = ""/></button>
            <button onClick = {() => {setSize(25); setGrid(alien); setGen(0);}}><img src = {alienImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setSize(25); setGrid(pacman); setGen(0);}}><img src = {pacmanImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setSize(25); setGrid(skull); setGen(0);}}><img src = {skullImg} width = "75" height = "75" alt = "" /></button>
        </div>
    );
};

export default Grid;

const GridContainer = styled.div`
    box-shadow: 12px 12px 14px #f8f5c2;
    display: grid;
    grid-template-columns: repeat(${props => props.size}, 20px);
    width: ${props => props.size * 20}px;
    margin: 0 auto;
`;
    

