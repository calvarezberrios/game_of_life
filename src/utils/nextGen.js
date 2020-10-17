import findNeighbors from "./findNeighbors";

export default function nextGen(grid) {
    // hold the changes in a temp buffer until ready to move
    // const nextGrid = grid.map((cols, col) => {
    //     return cols.map((cell, row) => {
    //         let neighbors = findNeighbors(grid, col, row);
    //         if(neighbors <= 1 || neighbors >= 4) {
    //             return {
    //                 ...cell,
    //                 isAlive: false
    //             }
    //         } else if (neighbors === 3) {
    //             return {
    //                 ...cell,
    //                 isAlive: true
    //             }
    //         }
    //         return cell;
    //     })
    // })

    for (let c = 0; c < grid.length; c++) {
        for (let r = 0; r < grid[0].length; r++) {
            let neighbors = findNeighbors(grid, c, r);
            if(neighbors <= 1 || neighbors >= 4) {
                grid[c][r].isAlive = false
            } else if (neighbors === 3) {
                grid[c][r].isAlive = true;
            }
        }
    }

    return grid;
}

