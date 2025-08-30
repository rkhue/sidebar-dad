function getRandomPastelColor() {
  const randomChannel = () => Math.floor(Math.random() * 127 + 127);
  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const RADIUS = 25

function insertGrid(N = 4) {
  const existing = document.getElementById("bolas-container");
  if (existing) existing.remove();

  const grid = document.createElement("div");
  grid.id = "bolas-container";
  grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;

  for (let i = 0; i < N * N; i++) {
    const item = document.createElement("div");
    item.className = "bola grid-item";
    item.style.backgroundColor = getRandomPastelColor();

    item.addEventListener("click", () => insertGrid(N));

    grid.appendChild(item);
  }

  document.body.appendChild(grid);
}

// Initial grid
insertGrid(16);
