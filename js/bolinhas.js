// Verificar se o container existe antes de executar
function initBolinhas() {
  const grid = document.getElementById("bolas-container");
  if (!grid) {
      console.error("Container 'bolas-container' não encontrado");
      return;
  }

  // Limpar container caso já tenha conteúdo
  grid.innerHTML = '';

  function getRandomPastelColor() {
      const randomChannel = () => Math.floor(Math.random() * 127 + 127);
      const r = randomChannel();
      const g = randomChannel();
      const b = randomChannel();
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  let ball_count = 0;

  function insertball() {
      ball_count++;
      
      // Corrigir o parenteses faltante na gridTemplateColumns
      const gridSize = Math.ceil(Math.sqrt(ball_count));
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
      grid.style.gap = '10px';
      grid.style.padding = '20px';
      grid.style.justifyItems = 'center';
      grid.style.alignItems = 'center';
      
      const item = document.createElement("div");
      item.className = "bola grid-item";
      item.style.backgroundColor = getRandomPastelColor();
      item.style.width = '50px';
      item.style.height = '50px';
      item.style.borderRadius = '50%';
      item.style.transition = 'margin 0.1s ease-out';
      item.style.cursor = 'pointer';
      
      grid.appendChild(item);
  }

  // Criar bolinhas iniciais
  for (let index = 0; index < 36; index++) {
      insertball();
  }

  const INFLUENCE_RADIUS = 300;
  const MAX_MARGIN = 150;

  function handleMouseMove(e) {
      // Verificar se estamos na página das bolinhas
      if (window.currentPage && window.currentPage !== 'bolinhas') return;
      
      const balls = document.querySelectorAll('.bola');
      
      balls.forEach(ball => {
          const rect = ball.getBoundingClientRect();
          const center_x = rect.left + rect.width / 2;
          const center_y = rect.top + rect.height / 2;

          const dx = e.clientX - center_x;
          const dy = e.clientY - center_y;
      
          const dist = Math.sqrt(dx * dx + dy * dy);        

          if (dist < INFLUENCE_RADIUS) {
            const force = (MAX_MARGIN * (INFLUENCE_RADIUS - dist)) / INFLUENCE_RADIUS;
            const angle = Math.atan2(dy, dx);
            const offsetX = Math.cos(angle) * force;
            const offsetY = Math.sin(angle) * force;
        
            ball.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
            ball.style.transform = 'translate(0, 0)';
        }
      });
  }
  
  // Adicionar event listener
  document.addEventListener("mousemove", handleMouseMove);
  
  // Função para limpar event listener quando necessário
  window.cleanupBolinhas = function() {
      document.removeEventListener("mousemove", handleMouseMove);
  };
}

// Executar imediatamente se o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBolinhas);
} else {
  initBolinhas();
}