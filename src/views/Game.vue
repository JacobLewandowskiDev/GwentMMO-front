<script>
import collisions from '@/data/collisions.js';
import indoorMusic from '@/data/indoorMusic.js';
import outdoorMusic from '@/data/outdoorMusic.js';
import tavern_map from '@/assets/images/tavern_map.png';
import playerImage from '@/assets/images/playerDown.png';
import playerUp from '@/assets/images/playerUp.png';
import playerLeft from '@/assets/images/playerLeft.png';
import playerRight from '@/assets/images/playerRight.png';


export default {
    data() {
        return {
            collisions: collisions,
            indoorMusic: indoorMusic,
            outdoorMusic: outdoorMusic,
            tavern_map: tavern_map,
            playerImage: playerImage,
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
        // Canvas creation
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1280;
        canvas.height = 720;

        const collisionsMap = []
        for(let i = 0; i < this.collisions.length; i += 50) {
            collisionsMap.push(this.collisions.slice(i, i + 50));
            
        }

        class Boundary{
            static width = 32 * 2.7;
            static height = 32 * 2.7
            constructor({position, width, height}) {
                this.position = position,
                this.width = 32 * 2.7,
                this.height = 32 * 2.7
            }

            draw() {
                ctx.fillStyle = 'red';
                ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            }
        }
        
        const offset = {
            x: -1865,
            y: -2050
        }

        const boundaries = [];

        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol == 2081) {
                    boundaries.push(new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y,
                    }}))
                }
            })
        })

        console.log(boundaries);

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
                x: offset.x,
                y: offset.y
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
                    lastKey = 's';
                    keys.s.pressed = true;
                    break;
                
                case 'a':
                    lastKey = 'a';
                    keys.a.pressed = true;
                    break;

                case 'd':
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

        const testBoundry = new Boundary( {
            position: {
                x: 600,
                y: 200
            }
        })

        const movables = [map, testBoundry]

        //Game loop
        function gameLoop() {
            window.requestAnimationFrame(gameLoop);
            map.draw();
            testBoundry.draw()
            // boundaries.forEach(boundary => {
            //     boundary.draw();
            // })
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
                    movables.forEach( moveable => {
                        moveable.position.y +=4;
                        });
                    break;

                case(keys.s.pressed && lastKey == 's'):
                        movables.forEach( moveable => {
                        moveable.position.y -=4;
                        });
                    break;
                
                case(keys.a.pressed && lastKey == 'a'):
                        movables.forEach( moveable => {
                        moveable.position.x +=4;
                        });
                    break;

                case(keys.d.pressed && lastKey == 'd'):
                        movables.forEach( moveable => {
                        moveable.position.x -=4;
                        });
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