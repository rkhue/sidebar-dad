// const bell = document.getElementById("sino");

const MAX_LIGHT_RADII = 250;

const MIN_LIGHT_RADII = 100;

const MAX_NOISE_SHIFT = 2;


function getLightTone(strength) {
    return `rgba(255, 255, 255, ${strength})`;
}


function getBellDistance(e, center_x, center_y) {
    const dx = e.clientX - center_x;
    const dy = e.clientY - center_y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist; 
}

class LightHue {
    constructor(intensity = 1, position_provider) {
        this.element = document.createElement("div");
        this.element.className = "light-hue";
        this.intensity = intensity
        document.body.appendChild(this.element);

        this.pos = position_provider
        
        this.offsetX = Math.random() * 50 - 25;
        this.offsetY = Math.random() * 50 - 25;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.01 + Math.random() * 0.02;
    }

    updateSize(e, strength) {
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


        let [px, py] = this.pos()
        
        this.element.style.left = `${px - power / 2 + floatX}px`;
        this.element.style.top = `${py - power / 2 + floatY}px`;
    }
    
    strength(e) {
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
        this.hues = []

        // get random position in the screen
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        for (let index = 0; index < force; index++) {
            let intensity = Math.max(0, 1 - index / diff);
            this.hues.push(new LightHue(intensity, () => [this.x, this.y]));
        }
    }

    update(e) {
        this.hues.forEach(lantern => {
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

function animate(time) {
    if (lastMove) {
        lanterns.forEach(lantern => {
            lantern.update(lastMove, time);
        })
    }
    requestAnimationFrame(animate);
}

animate();