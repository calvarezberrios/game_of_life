import findNeighbors from "./findNeighbors"

export default function nextGen(grid) {
    // hold the changes in a temp buffer until ready to move
    const nextGrid = grid.map((cols, col) => {
        return cols.map((cell, row) => {
            // Check if cell is dead or alive
            if(cell.isAlive) {
                // if alive and has 1 or less neighbors, or 4 or more neighbors, then it dies
                if(findNeighbors(grid, col, row) <= 1 || findNeighbors(grid, col, row) >= 4) {
                    return {
                        ...cell,
                        isAlive: false
                    }
                }
            } else {
                // if dead and has 3 neighbors, it comes alive
                if(findNeighbors(grid, col, row) === 3) {
                    return {
                        ...cell,
                        isAlive: true
                    }
                }
            }
            return cell;
        })
    })

    return nextGrid;
}