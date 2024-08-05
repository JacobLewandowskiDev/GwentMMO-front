<script>
import collisions from '@/data/collisions.js';
import indoorMusic from '@/data/indoorMusic.js';
import outdoorMusic from '@/data/outdoorMusic.js';
import tavern_map from '@/assets/images/tavern_map.png';
import playerImage from '@/assets/images/playerDown.png';

export default {
    data() {
        return {
            collisions: collisions,
            indoorMusic: indoorMusic,
            outdoorMusic: outdoorMusic,
            tavern_map: tavern_map,
            playerImage: playerImage
        }
    },

    props: {
        username: {
            type: String,
            required: true
        },
        profileImg: {
            type: Number,
            required: true
        }
    },

    methods: {
      
    },

    mounted() {
        console.log(this.collisions);
        // Canvas creation
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1280;
        canvas.height = 720;

        const mapImage = new Image();
        mapImage.src = this.tavern_map;

        const playerImage = new Image();
        playerImage.src = this.playerImage;

        class Sprite {
            constructor({ position, velocity, image}) {
                this.position = position,
                this.image = image
            }
            draw() {
                ctx.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        const map = new Sprite({
            position: {
                x: -1280,
                y: -1500
            },
            image: mapImage
        })

        // Key eventListeners:
        const keys = {
            w: { pressed: false },
            s: { pressed: false },
            a: { pressed: false },
            d: { pressed: false },
        }

        let lastKey = '';
        window.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w':
                    lastKey = 'w';
                    keys.w.pressed = true;
                    break;
                    
                case 's':
                console.log("S Pressed");
                    lastKey = 's';
                    keys.s.pressed = true;
                    break;
                
                case 'a':
                console.log("A Pressed");
                    lastKey = 'a';
                    keys.a.pressed = true;
                    break;

                case 'd':
                console.log("D Pressed");
                    lastKey = 'd';
                    keys.d.pressed = true;
                    break;
            }
        });

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
        });

        //Game loop
        function gameLoop() {
            window.requestAnimationFrame(gameLoop);
            map.draw();
            ctx.drawImage(
                playerImage,
                0,
                0,
                playerImage.width / 4,
                playerImage.height,
                canvas.width / 2 - playerImage.width / 8,
                canvas.height / 2 - playerImage.height / 2,
                playerImage.width / 4,
                playerImage.height
            );

            switch(true) {
                case(keys.w.pressed && lastKey == 'w'):
                    console.log("W Pressed");
                    map.position.y +=4;
                    break;

                case(keys.s.pressed && lastKey == 's'):
                    console.log("S Pressed");
                    map.position.y -=4;
                    break;
                
                case(keys.a.pressed && lastKey == 'a'):
                    console.log("A Pressed");
                    map.position.x +=4;
                    break;

                case(keys.d.pressed && lastKey == 'd'):
                    console.log("D Pressed");
                    map.position.x -=4;
                    break;
            };
        };
        
        gameLoop();
    }
}
</script>

<template>
    <canvas id="myCanvas"></canvas>
</template>

<style scoped>
body {
    * {
        all: initial;
    }
}
.myCanvas {
    border: 2px solid yellow;
}
</style>