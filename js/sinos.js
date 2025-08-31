const bell = document.getElementById("sino");

const MAX_LIGHT_RADII = 250;

const MIN_LIGHT_RADII = 100;

const MAX_NOISE_SHIFT = 2;


function getLightTone(strength) {
    return `rgba(255, 255, 255, ${strength})`;
}


function getBellDistance(e) {
    const rect = bell.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;

    const dx = e.clientX - center_x;
    const dy = e.clientY - center_y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist; 
}

class LightHue {
    constructor(intensity = 1) {
        this.element = document.createElement("div");
        this.element.className = "light-hue";
        this.intensity = intensity
        document.body.appendChild(this.element);
    }

    updateSize(e, strength) {
        const radius = Math.max(
            MIN_LIGHT_RADII,
            MIN_LIGHT_RADII + (MAX_LIGHT_RADII - MIN_LIGHT_RADII) * strength * this.intensity
        );

        const power = radius * strength * (this.intensity ** (1 - strength));

        this.element.style.width = `${power}px`;
        this.element.style.height = `${power}px`;
        this.element.style.opacity = Math.pow(strength * this.intensity, 1.5);
        // this.element.style.backgroundColor = getLightTone(strength * this.intensity); 

        // make it same position of the cursor
        
        const [nx, ny] = this.noise;

        this.element.style.left = `${e.clientX - power / 2 + nx}px`;
        this.element.style.top = `${e.clientY - power / 2 + ny}px`;
    }

    get noise() {
        const noiseAmount = MAX_NOISE_SHIFT * this.intensity;
        const nx = (Math.random() - 0.5) * noiseAmount;
        const ny = (Math.random() - 0.5) * noiseAmount;

        return [nx, ny];
    }
    
    strength(dist) {
        return Math.max(0, 1 - (dist / MAX_LIGHT_RADII));
    }

    update(e) {
        const dist = getBellDistance(e);
        const strength = this.strength(dist);
        this.updateSize(e, strength);
    }
}

class Lantern {
    constructor(force = 1) {
        this.lanterns = []
        for (let index = 0; index < force; index++) {
            lanterns.push(new LightHue(Math.max(0, 1 - index / diff)));
        }
    }

    update(e) {
        this.lanterns.forEach(lantern => {
            lantern.update(e);
        })
    }
}

const lanterns = [];
const diff = 10;
for (let index = 0; index < diff; index++) {
    lanterns.push(new Lantern(index));
}

let lastMove = null;

document.addEventListener("mousemove", (e) => {
    lastMove = e;
})

function animate() {
    if (lastMove) {
        lanterns.forEach(lantern => {
            lantern.update(lastMove);
        })
    }
    requestAnimationFrame(animate);
}

animate();