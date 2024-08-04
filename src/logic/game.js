const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

if (typeof window.collisions !== 'undefined') {
    const collisions = window.collisions;

    console.log('Collisions:', collisions);

    // Your game logic here
} else {
    console.error('Collisions data is not available.');
}


// Import Map & Character Sprite (crop character sprite to a single animation frame and center)
const mapImage = new Image();
mapImage.src = '/src/assets/images/tavern_map.png';

const playerimage = new Image();
playerimage.src = '/src/assets/images/playerDown.png';

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const map = new Sprite( {
    position: {
        x: -1280,
        y: -1500
    },
    image: mapImage
})

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// Game loop for animations
function animate() {
    window.requestAnimationFrame(animate)
    map.draw()
    ctx.drawImage(
        playerimage, 
        0,
        0,
        playerimage.width / 4,
        playerimage.height,
        canvas.width / 2 - playerimage.width / 8, 
        canvas.height / 2 - playerimage.height / 2,
        playerimage.width / 4,
        playerimage.height
    )

    switch(true) {
        case (keys.w.pressed && lastKey == 'w'):
            map.position.y += 4
            break;
        case (keys.s.pressed && lastKey == 's'):
            map.position.y -= 4
            break;
        case (keys.a.pressed && lastKey == 'a'):
            map.position.x += 4
            break;
        case (keys.d.pressed && lastKey == 'd'):
            map.position.x -= 4
            break;
    }
}

animate();

// Keydown eventListener
let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;

        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;

        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;

        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = false;
            break;

        case 's':
            keys.s.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;
    }
})
