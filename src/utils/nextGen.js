import findNeighbors from "./findNeighbors"

export default function nextGen(grid) {
    
    for(let c = 0; c < grid.length; c++){
        for(let r = 0; r < grid[0].length; r++) {
            const neighbors = findNeighbors(grid, c, r);

            if(neighbors < 2 || neighbors > 3) {
                grid[c][r].isAlive = false;
            } else if (!grid[c][r].isAlive && neighbors === 3) {
                grid[c][r].isAlive = true;
            }
        }
    }
    

    return grid;
}