const operations = [
    [0, 1],
    [1, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
]

export default function findNeighbors(grid, c, r) {
    // let rowLimit = grid.length-1;
    // let colLimit = grid[0].length-1;

    let neighbors = 0;
    
    // for(let x = Math.max(0, c - 1); x <= Math.min(c + 1, rowLimit); x++) {
    //     for(let y = Math.max(0, r - 1); y <= Math.min(r + 1, colLimit); y++) {
    //         if((x !== c || y !== r) && grid[x][y].isAlive) {
    //             neighbors += 1
    //         }
    //     }
    // }

    

    operations.forEach(([x, y]) => {
        const newI = c + x;
        const newJ = r + y;
        if((newI >= 0 && newI < grid.length) && (newJ >= 0 && newJ < grid[0].length) && grid[newI][newJ].isAlive) {
            neighbors += 1;
        }
    })
    
    return neighbors;
}