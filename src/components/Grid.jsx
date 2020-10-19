import React, { useCallback, useRef, useState } from 'react';
import styled from "styled-components";
import produce from "immer";
import nextGen from '../utils/nextGen';
import Cell from './Cell';
import findNeighbors from '../utils/findNeighbors';

const initialGrid = Array.from({ length: 25 }).map(() => Array.from({ length: 25 }).fill({ isAlive: false }));

const Grid = () => {  

    const [grid, setGrid] = useState(initialGrid);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gen, setGen] = useState(0);

    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    const animate = useCallback(() => {
        if(!isPlayingRef.current) return;

        setGrid(grid => produce(grid, copy => {
            for(let c = 0; c < 25; c++){
                for(let r = 0; r < 25; r++) {
                    const neighbors = findNeighbors(grid, c, r);
        
                    if(neighbors < 2 || neighbors > 3) {
                        copy[c][r].isAlive = false;
                    } else if (!grid[c][r].isAlive && neighbors === 3) {
                        copy[c][r].isAlive = true;
                    }
                }
            }
        }));

        setTimeout(animate, 100, setGen(gen + 1));
    }, []);

    return (
        <>
            <button onClick = {() => {
                setIsPlaying(!isPlaying);
                if(!isPlaying) {
                    isPlayingRef.current = true;
                    animate();
                } else {
                    setGen(0);
                    setGrid(initialGrid);
                }
            }}>Play</button>
            <GridContainer>          
                {/* Map out the grid and display on screen */}
                {grid.map((cols, col) => {
                    return cols.map((cell, row) => {
                        return <Cell key = {`${col}-${row}`} isPlaying = {isPlaying} grid = {grid} setGrid = {setGrid} col = {col} row = {row} isAlive = {cell.isAlive} />
                    })
                })}
            </GridContainer>
        </>
    );
};

export default Grid;


const GridContainer = styled.div`
    box-shadow: 12px 12px 14px #f8f5c2;
    display: grid;
    grid-template-columns: repeat(25, 20px);
    width: ${25 * 20}px;
    margin: 0 auto;
`;