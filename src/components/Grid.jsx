import React from 'react';
import styled from "styled-components";
import nextGen from '../utils/nextGen';

const Grid = ({grid, setGrid}) => {  

    // Toggle isAlive on clicked cell
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
            <div>
                <button onClick = {() => setGrid(nextGen(grid))}>Next</button>

            </div>           
            {/* Map out the grid and display on screen */}
            {grid.map((col, colIndex) => {
                return (
                    <span key = {colIndex}>
                        <br />
                        {col.map((cell, rowIndex) => {
                            return <Cell key = {rowIndex} isAlive = {cell.isAlive} onClick = {() => setIsAlive(colIndex, rowIndex)}/>
                        })}
                    </span>
                )
            })}
        </div>
    );
};

export default Grid;


const Cell = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    margin-top: -10px;
    margin-left: -1px;
    background: ${props => props.isAlive ? "#ffffff" : "#cccccc"}
`;