const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

ctx.fillStyle = 'white';
ctx.fillRect(50,50, canvas.width, canvas.height);


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
        x: -1400,
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
        case keys.w.pressed:
            map.position.y = map.position.y + 4
            break;
        case keys.s.pressed:
            map.position.y = map.position.y - 4
            break;
        case keys.a.pressed:
            map.position.x = map.position.x + 4
            break;
        case keys.d.pressed:
            map.position.x = map.position.x - 4
            break;
    }

    // if (keys.s.pressed) {
    //     map.position.y = map.position.y - 3
    // }
}

animate();


window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = true;
            break;

        case 's':
            keys.s.pressed = true;
            break;

        case 'a':
            keys.a.pressed = true;
            break;

        case 'd':
            keys.d.pressed = true;
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
