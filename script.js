const numRows = 30;
const numCols = 50;
let running = false;
let interval;

const gridElement = document.getElementById("grid");

// Initialize grid
let grid = Array.from({ length: numRows }, () =>
  Array.from({ length: numCols }, () => 0)
);

function drawGrid() {
  gridElement.innerHTML = "";
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (grid[i][j]) cell.classList.add("alive");
      cell.addEventListener("click", () => {
        grid[i][j] = grid[i][j] ? 0 : 1;
        drawGrid();
      });
      gridElement.appendChild(cell);
    }
  }
}

function nextGeneration() {
  const newGrid = grid.map((row, i) =>
    row.map((cell, j) => {
      let neighbors = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          const ni = i + x;
          const nj = j + y;
          if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
            neighbors += grid[ni][nj];
          }
        }
      }
      if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
      if (cell === 0 && neighbors === 3) return 1;
      return cell;
    })
  );
  grid = newGrid;
  drawGrid();
}

document.getElementById("start").addEventListener("click", () => {
  running = !running;
  document.getElementById("start").innerText = running ? "Stop" : "Start";
  if (running) {
    interval = setInterval(nextGeneration, 200);
  } else {
    clearInterval(interval);
  }
});

document.getElementById("clear").addEventListener("click", () => {
  grid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
  drawGrid();
});

document.getElementById("random").addEventListener("click", () => {
  grid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
  drawGrid();
});

// Initial draw
drawGrid();
