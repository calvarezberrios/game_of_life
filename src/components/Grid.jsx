import { find } from 'async';
import React, { useEffect, useState } from 'react';
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

const Grid = ({grid, setGrid}) => {
    // Create state for cell grid, 25 x 25 with each cell set to value 0
    let nextGrid = grid;

    function setIsAlive(col, row) {   

        setGrid(grid.map((cols, colIndex) => {
            return cols.map((cell, rowIndex) => {
                if(colIndex === col && rowIndex === row) {
                    return {
                        ...cell,
                        isAlive: !cell.isAlive
                    }
                }
                return cell;
            })
        }))
    }
    function findNeighbors(grid, c, r) {
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

        return neighbors;
    }

    function nextGen() {
        nextGrid = grid.map((cols, col) => {
            return cols.map((cell, row) => {
                if(cell.isAlive) {
                    if(findNeighbors(grid, col, row) <= 1 || findNeighbors(grid, col, row) >= 4) {
                        return {
                            ...cell,
                            isAlive: false
                        }
                    }
                } else {
                    if(findNeighbors(grid, col, row) === 3) {
                        return {
                            ...cell,
                            isAlive: true
                        }
                    }
                }
                return cell
            })
        })

        setGrid(nextGrid)
    }
    

    return (
        <div>
            <div>
                <button onClick = {nextGen}>Next</button>

            </div>           
            {/* Map out the grid and display on screen */}
            {grid.map((col, colIndex) => {
            return (
                <>
                <br />
                {col.map((cell, rowIndex) => {
                    return <Cell isAlive = {cell.isAlive} onClick = {() => setIsAlive(colIndex, rowIndex)}/>
                })}
                </>
            )
            
        })}
        </div>
    );
};

export default Grid;