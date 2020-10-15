import React, { useState } from 'react';
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

const Grid = ({cols, rows}) => {
    // Create state for cell grid, 25 x 25 with each cell set to value 0
    const [grid, setGrid] = useState(new Array(cols).fill(new Array(rows).fill({
        isAlive: false
    })));

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
    return (
        <div>
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