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

const initialGrid = Array.from({ length: 50 }).map(() => Array.from({ length: 50 }).fill({ isAlive: false }));

const Grid = () => { 
    const [grid, setGrid] = useState(initialGrid); 
    const [gen, setGen] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(10);

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
            for(let c = 0; c < 50; c++){
                for(let r = 0; r < 50; r++) {
                    const neighbors = findNeighbors(grid, c, r);
        
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

        setTimeout(runSimulation, 100);
    }, []);

    function clearGrid() {
        setIsPlaying(false);
        setGrid(initialGrid);
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
                <button onClick = {() => setSpeed(500)}>slow</button>
                <button onClick = {() => setSpeed(10)}>fast</button>
                <br />
                <label htmlFor = "gridSize">Grid Size: </label>
                <select id = "gridSize" >
                    <option value = {25}>25x25</option>
                    <option value = {50}>50x50</option>
                    <option value = {100}>100x100</option>
                </select>

            </div>           
            {/* Map out the grid and display on screen */}
            <GridContainer>          
                {/* Map out the grid and display on screen */}
                {grid.map((cols, col) => {
                    return cols.map((cell, row) => {
                        return <Cell key = {`${col}-${row}`} isPlaying = {isPlaying} grid = {grid} setGrid = {setGrid} col = {col} row = {row} isAlive = {cell.isAlive} />
                    })
                })}
            </GridContainer>
            

            <br />

            <button onClick = {() => {setGrid(life); setGen(0);}}><img src = {lifeImg} width = "75" height = "75" alt = ""/></button>
            <button onClick = {() => {setGrid(alien); setGen(0);}}><img src = {alienImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setGrid(pacman); setGen(0);}}><img src = {pacmanImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setGrid(skull); setGen(0);}}><img src = {skullImg} width = "75" height = "75" alt = "" /></button>
        </div>
    );
};

export default Grid;

const GridContainer = styled.div`
    box-shadow: 12px 12px 14px #f8f5c2;
    display: grid;
    grid-template-columns: repeat(50, 20px);
    width: ${50 * 20}px;
    margin: 0 auto;
`;
    

