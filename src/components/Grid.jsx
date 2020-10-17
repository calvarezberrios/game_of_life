import React, { useCallback, useRef, useState } from 'react';
import produce from "immer";
import styled from "styled-components";
import nextGen from '../utils/nextGen';
import lifeImg from "../assets/images/life.png";
import alienImg from "../assets/images/alien.png";
import pacmanImg from "../assets/images/pacman.png";
import skullImg from "../assets/images/skull.png";
import { life, alien, skull, pacman } from '../presets';
import findNeighbors from '../utils/findNeighbors';

const Grid = ({grid, setGrid, setGridSize}) => {  
    const [gen, setGen] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(10);

    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    // Toggle isAlive on clicked cell
    function setIsAlive(col, row) {  
        if(!isPlaying) { 
            /* setGrid(grid.map((cols, colIndex) => {
                return cols.map((cell, rowIndex) => {
                    if(colIndex === col && rowIndex === row) {
                        return {
                            ...cell,
                            isAlive: !cell.isAlive
                        }
                    }
                    return cell;
                })
            })) */

            setGrid(grid => produce(grid, copy => {copy[col][row].isAlive = !copy[col][row].isAlive}));

            setGen(0);
        }
    }  

    const moveToNextGen = useCallback(() => {
        
        setGrid(grid => {
            return produce(grid, copy => {
                for (let c = 0; c < grid.length; c++) {
                    for (let r = 0; r < grid[0].length; r++) {
                        let rowLimit = grid.length-1;
                        let colLimit = grid[0].length-1;
                        let neighbors = 0;

                        for(let x = Math.max(0, c - 1); x <= Math.min(c + 1, rowLimit); x++) {
                            for(let y = Math.max(0, r - 1); y <= Math.min(r + 1, colLimit); y++) {
                                if((x !== c || y !== r) && grid[x][y].isAlive) {
                                    neighbors += 1
                                }
                            }
                        }

                        if(neighbors <= 1 || neighbors >= 4) {
                            copy[c][r].isAlive = false
                        } else if (neighbors === 3) {
                            copy[c][r].isAlive = true;
                        }
                    }
                }
            })
        });
        setGen(gen => gen + 1)

    }, [gen, grid, setGrid]);

    const runSimulation = useCallback(() => {
        if(!isPlayingRef.current) {
            return;
        }

        moveToNextGen()

        setTimeout(runSimulation, 25);
    }, []);

    function clearGrid() {
        setIsPlaying(false);
        setGrid(new Array(25).fill(new Array(25).fill({isAlive: false})));
        setGen(0);
        setSpeed(10);
    }

    /* useEffect(() => {
        if(isPlaying) {
            setTimeout(() => {
                moveToNextGen();
            }, speed);
        }
        
    }, [isPlaying, gen, speed]); // eslint-disable-line react-hooks/exhaustive-deps */

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
                <select id = "gridSize" onChange = {(e) => setGridSize(parseInt(e.target.value))}>
                    <option value = {25}>25x25</option>
                    <option value = {50}>50x50</option>
                    <option value = {100}>100x100</option>
                </select>

            </div>           
            {/* Map out the grid and display on screen */}
            {grid.map((col, colIndex) => {
                return (
                    <React.Fragment key = {colIndex}>
                        <br />
                        {col.map((cell, rowIndex) => {
                            return <Cell key = {rowIndex} isAlive = {cell.isAlive} onClick = {() => setIsAlive(colIndex, rowIndex)}/>
                        })}
                    </React.Fragment>
                )
            })}
            

            <br />

            <button onClick = {() => {setGrid(life); setGen(0);}}><img src = {lifeImg} width = "75" height = "75" alt = ""/></button>
            <button onClick = {() => {setGrid(alien); setGen(0);}}><img src = {alienImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setGrid(pacman); setGen(0);}}><img src = {pacmanImg} width = "75" height = "75" alt = "" /></button>
            <button onClick = {() => {setGrid(skull); setGen(0);}}><img src = {skullImg} width = "75" height = "75" alt = "" /></button>
        </div>
    );
};

export default Grid;

const Cell = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    margin-top: -10px;
    margin-left: -1px;
    background: ${props => props.isAlive ? "#ffff00" : "#000080"};
`;
    

