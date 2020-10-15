export default function findNeighbors(grid, c, r) {
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