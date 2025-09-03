function getRandomPastelColor() {
  const randomChannel = () => Math.floor(Math.random() * 127 + 127);
  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const RADIUS = 25
const grid = document.getElementById("bolas-container");

let ball_count = 0;


function insertball() {
  ball_count++;

  grid.id = "bolas-container";
  grid.style.gridTemplateColumns = `repeat(${Math.floor(Math.sqrt(ball_count))}, auto`;
  grid.style.gridTemplateRows = `repeat(${Math.floor(Math.sqrt(ball_count))}, auto)`

  const item = document.createElement("div");
  item.className = "bola grid-item";
  item.style.backgroundColor = getRandomPastelColor();
  grid.appendChild(item);


  document.body.appendChild(grid);
}

// Initial grid
for (let index = 0; index < 25; index++) {
  insertball();
 
}

const INFLUENCE_RADIUS = 150;
const MAX_MARGIN = 75;

document.addEventListener("mousemove", (e) => {
  const balls = document.querySelectorAll('.bola');

  balls.forEach(ball => {
    const rect = ball.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;

    // get distance
    const dx = e.clientX - center_x;
    const dy = e.clientY - center_y;
  
    const dist = Math.sqrt(dx * dx + dy * dy);
    let margin = 0;
    margin = Math.min(MAX_MARGIN, MAX_MARGIN * (INFLUENCE_RADIUS / dist));


    ball.style.margin = `${margin}px`
    // ball.innerHTML = `${Math.floor(margin)}px`
  })
})

