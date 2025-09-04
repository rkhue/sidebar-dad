const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const contentArea = document.querySelector('.content-area');
const navItems = document.querySelectorAll('.nav-item');
const pageContents = document.querySelectorAll('.page-content');

let currentPage = 'home';
let bolinhasInitialized = false;
let lanternasInitialized = false;

function showPage(pageId) {
    pageContents.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Inicializar as páginas quando necessário
        if (pageId === 'bolinhas' && !bolinhasInitialized) {
            loadBolinhasScript();
        } else if (pageId === 'lanternas' && !lanternasInitialized) {
            loadLanternasScript();
        }
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('show-sidebar');
    overlay.classList.toggle('active');
    contentArea.classList.toggle('sidebar-open');
}

function closeSidebar() {
    sidebar.classList.remove('show-sidebar');
    overlay.classList.remove('active');
    contentArea.classList.remove('sidebar-open');
}

toggleButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        showPage(pageId);
        
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// Função para carregar o script das bolinhas
function loadBolinhasScript() {
    if (bolinhasInitialized) return;
    
    bolinhasInitialized = true;
    
    // Carregar e executar o código das bolinhas
    const script = document.createElement('script');
    script.onload = function() {
        // O código das bolinhas será executado automaticamente
    };
    script.src = './js/bolinhas.js';
    document.head.appendChild(script);
}

// Função para carregar o script das lanternas
function loadLanternasScript() {
    if (lanternasInitialized) return;
    
    lanternasInitialized = true;
    
    // Implementação das lanternas (mantendo do código original)
    initLanternas();
}

function getRandomPastelColor() {
    const randomChannel = () => Math.floor(Math.random() * 127 + 127);
    const r = randomChannel();
    const g = randomChannel();
    const b = randomChannel();
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function getBellDistance(e, center_x, center_y) {
    const dx = e.clientX - center_x;
    const dy = e.clientY - center_y;
    return Math.sqrt(dx * dx + dy * dy);
}

class LightHue {
    constructor(intensity = 1, position_provider) {
        this.element = document.createElement("div");
        this.element.className = "light-hue";
        this.intensity = intensity;
        document.getElementById('lanternas-page').appendChild(this.element);

        this.pos = position_provider;
        
        this.offsetX = Math.random() * 50 - 25;
        this.offsetY = Math.random() * 50 - 25;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.01 + Math.random() * 0.02;
    }

    updateSize(e, strength) {
        const MIN_LIGHT_RADII = 100;
        const MAX_LIGHT_RADII = 250;
        
        const radius = Math.max(
            MIN_LIGHT_RADII,
            MIN_LIGHT_RADII + (MAX_LIGHT_RADII - MIN_LIGHT_RADII) * strength * this.intensity
        );

        const power = radius * strength * (this.intensity ** (1 - strength));

        this.angle += this.speed;

        const floatX = this.offsetX + Math.cos(this.angle) * 10 * this.intensity;
        const floatY = this.offsetY + Math.sin(this.angle) * 10 * this.intensity;

        this.element.style.width = `${power}px`;
        this.element.style.height = `${power}px`;
        this.element.style.opacity = Math.max(0.5, Math.pow(strength * this.intensity, 2));

        let [px, py] = this.pos();
        
        this.element.style.left = `${px - power / 2 + floatX}px`;
        this.element.style.top = `${py - power / 2 + floatY}px`;
    }
    
    strength(e) {
        const MAX_LIGHT_RADII = 250;
        let [px, py] = this.pos();
        const dist = getBellDistance(e, px, py);
        return Math.max(0.2, 1 - (dist / MAX_LIGHT_RADII));
    }

    update(e) {
        const strength = this.strength(e);
        this.updateSize(e, strength);
    }
}

class Lantern {
    constructor(force = 1) {
        this.hues = [];

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        const diff = 10;
        for (let index = 0; index < force; index++) {
            let intensity = Math.max(0, 1 - index / diff);
            this.hues.push(new LightHue(intensity, () => [this.x, this.y]));
        }
    }

    update(e) {
        this.hues.forEach(lantern => {
            lantern.update(e);
        });
    }
}

function initLanternas() {
    const lanterns = [];
    const diff = 10;
    
    for (let index = 0; index < diff; index++) {
        lanterns.push(new Lantern(index));
    }

    let lastMove = null;

    function handleLanternasMouseMove(e) {
        if (currentPage === 'lanternas') {
            lastMove = e;
        }
    }

    document.addEventListener("mousemove", handleLanternasMouseMove);

    function animate(time) {
        if (lastMove && currentPage === 'lanternas') {
            lanterns.forEach(lantern => {
                lantern.update(lastMove, time);
            });
        }
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicializar com a página home
showPage('home');