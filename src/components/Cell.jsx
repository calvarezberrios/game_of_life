import produce from 'immer';
import React from 'react';
import styled from 'styled-components';

const Cell = ({grid, setGrid, col, row, isAlive, isPlaying}) => {
    return (
        <CellContainer isAlive = {isAlive} onClick = {() => {
            if (!isPlaying) {
                const newGrid = produce(grid, copy => {
                    copy[col][row].isAlive = !copy[col][row].isAlive;
                });
                setGrid(newGrid);
            }
        }}/>
    );
};

export default Cell;

const CellContainer = styled.div`
    width: 20px;
    height: 20px;
    background: ${props => props.isAlive ? "#fff000" : "#000FFF"};
    border: 1px solid black;
`;