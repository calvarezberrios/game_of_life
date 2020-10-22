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
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

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

let speed = 100

const Grid = () => { 
    const classes = useStyles();
    const [size, setSize] = useState(25);
    const [grid, setGrid] = useState(life); 
    const [gen, setGen] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

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
        speed = 100;
    }



    return (
        <Container>
            <div>
                
                <Typography variant="h6" color="inherit">
                    Generation: {gen}
                </Typography>

                <Controls>
                    <Button variant = "contained" onClick ={() => {
                            setIsPlaying(!isPlaying);
                            if(!isPlaying) {
                                isPlayingRef.current = true;
                                runSimulation();
                        }
                    }}>{isPlaying ? "Stop" : "Play"}</Button>{" "}
                    <Button variant = "contained" disabled = {isPlaying} onClick = {moveToNextGen}>Next</Button>{" "}
                    <Button variant = "contained" disabled = {isPlaying} onClick = {clearGrid}>clear</Button>{" "}
                    <Button variant = "contained" onClick = {() => {speed = 1000; }}>slow</Button>{" "}
                    <Button variant = "contained" onClick = {() => {speed = 25; }}>fast</Button>{" "}

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="gridSize-label">Grid Size</InputLabel>
                        <Select
                            labelId="gridSize-label"
                            id="gridSize"
                            value = {size}
                            onChange={(e) => {
                                setSize(e.target.value);
                                setGrid(Array.from({ length: parseInt(e.target.value) }).map(() => Array.from({ length: parseInt(e.target.value) }).fill({ isAlive: false })));
                                e.target.value = "";
                            }}
                            label="Grid Size"
                        >
                            <MenuItem value={25}>25 x 25</MenuItem>
                            <MenuItem value={40}>40 x 40</MenuItem>
                        </Select>
                    </FormControl>
                </Controls>

                {/* Map out the grid and display on screen */}
                <GridContainer size = {size}>          
                    {/* Map out the grid and display on screen */}
                    {grid.map((cols, col) => {
                        return cols.map((cell, row) => {
                            return <Cell key = {`${col}-${row}`} isPlaying = {isPlaying} grid = {grid} setGrid = {setGrid} size = {size} col = {col} row = {row} isAlive = {cell.isAlive} />
                        })
                    })}
                </GridContainer>
            </div>


            <Presets>
                <Typography variant = "h5" color = "inherit">
                    Preset Grids:
                </Typography>

                <span onClick = {() => {setSize(25); setGrid(life); setGen(0);}}><img src = {lifeImg} width = "75" height = "75" alt = ""/></span>
                <span onClick = {() => {setSize(25); setGrid(alien); setGen(0);}}><img src = {alienImg} width = "75" height = "75" alt = "" /></span>
                <span onClick = {() => {setSize(25); setGrid(pacman); setGen(0);}}><img src = {pacmanImg} width = "75" height = "75" alt = "" /></span>
                <span onClick = {() => {setSize(25); setGrid(skull); setGen(0);}}><img src = {skullImg} width = "75" height = "75" alt = "" /></span>
            </Presets>
        </Container>
    );
};

export default Grid;

const Container = styled.div`
    width: 43%;
    text-align: center;
    display: flex;
    justify-content: space-between;

`;
const GridContainer = styled.div`
    box-shadow: 12px 12px 14px #f8f5c2;
    display: grid;
    grid-template-columns: repeat(${props => props.size}, ${props => 625 / props.size}px);
    width: ${props => props.size * (625 / props.size)}px;
`;
    
const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    button {
        margin-right: 10px;
        height: 50px;
    }
`;

const Presets = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
        cursor: pointer;
        margin: 10px;

        &:hover {

            & img {
                box-shadow: 0px 0px 8px 8px #fff000;
            }
        }
    }
`;

