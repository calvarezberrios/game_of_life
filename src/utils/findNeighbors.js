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
    let neighbors = 0;

    operations.forEach(([x, y]) => {
        const newC = c + x;
        const newR = r + y;

        if ((newC >= 0 && newC < 25) && (newR >= 0 && newR < 25) && (grid[newC][newR].isAlive)) {
            neighbors += 1;
        }
    })

    return neighbors
}