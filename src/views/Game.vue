<script>
import collisions from "@/data/collisions.js";
import indoorMusic from "@/data/indoorMusic.js";
import outdoorMusic from "@/data/outdoorMusic.js";
import tavern_map from "@/assets/images/tavern_map.png";
import tavern_map_foreground from "@/assets/images/tavern_map_foreground.png";
import playerImage from "@/assets/images/playerDown.png";
import playerUp from "@/assets/images/playerUp.png";
import playerLeft from "@/assets/images/playerLeft.png";
import playerRight from "@/assets/images/playerRight.png";

export default {
  data() {
    return {
      collisions: collisions,
      indoorMusic: indoorMusic,
      outdoorMusic: outdoorMusic,
      tavern_map: tavern_map,
      tavern_map_foreground: tavern_map_foreground,
      playerImage: playerImage,
    };
  },

  props: {
    username: {
      type: String,
      required: true,
    },
    profileImg: {
      type: Number,
      required: true,
    },
  },

  methods: {},

  mounted() {
    // Canvas creation
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const collisionsMap = [];
    for (let i = 0; i < this.collisions.length; i += 50) {
      collisionsMap.push(this.collisions.slice(i, i + 50));
    }

    class Boundary {
      static width = 32 * 2.7;
      static height = 32 * 2.7;
      constructor({ position, width, height }) {
        (this.position = position),
          (this.width = 32 * 2.7),
          (this.height = 32 * 2.7);
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, .0)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    const offset = {
      x: -1865,
      y: -2050,
    };

    const boundaries = [];

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol == 2081) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const mapImage = new Image();
    mapImage.src = this.tavern_map;

    const playerImage = new Image();
    playerImage.src = this.playerImage;

    const mapForeground = new Image();
    mapForeground.src = this.tavern_map_foreground;

    class Sprite {
      constructor({ position, image, frames = { max: 1 } }) {
        (this.position = position),
          (this.image = image),
          (this.frames = frames),
          (this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
          });
      }
      draw() {
        ctx.drawImage(
          this.image,
          0,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );
      }
    }

    const player = new Sprite({
      position: {
        // 192 & 68 are the dimensions of the character image
        x: canvas.width / 2 - 192 / 8,
        y: canvas.height / 2 - 68 / 2,
      },
      image: playerImage,
      frames: {
        max: 4,
      },
    });

    const map = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: mapImage,
    });

    const mapForegroundS = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: mapForeground
    });

    // Key eventListeners:
    const keys = {
      w: { pressed: false },
      s: { pressed: false },
      a: { pressed: false },
      d: { pressed: false },
    };

    let lastKey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          lastKey = "w";
          keys.w.pressed = true;
          break;

        case "s":
          lastKey = "s";
          keys.s.pressed = true;
          break;

        case "a":
          lastKey = "a";
          keys.a.pressed = true;
          break;

        case "d":
          lastKey = "d";
          keys.d.pressed = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          keys.w.pressed = false;
          break;

        case "s":
          keys.s.pressed = false;
          break;

        case "a":
          keys.a.pressed = false;
          break;

        case "d":
          keys.d.pressed = false;
          break;
      }
    });

    const movables = [map, mapForegroundS, ...boundaries];

    function rectangularCollision({ rectangle_1, rectangle_2 }) {
      return (
        rectangle_1.position.x + rectangle_1.width >= rectangle_2.position.x &&
        rectangle_1.position.x <= rectangle_2.position.x + rectangle_2.width &&
        rectangle_1.position.y + rectangle_1.height >= rectangle_2.position.y &&
        rectangle_1.position.y <= rectangle_2.position.y + rectangle_2.height
      );
    }

    //Game loop
    function gameLoop() {
      window.requestAnimationFrame(gameLoop);
      map.draw();
      boundaries.forEach((boundary) => {
        boundary.draw();
      });
      player.draw();
      mapForegroundS.draw();

      let moving = true;
      if (keys.w.pressed && lastKey == "w") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle_1: player,
              rectangle_2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 4,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving == true) {
          movables.forEach((moveable) => {
            moveable.position.y += 4;
          });
        }
      }

      if (keys.s.pressed && lastKey == "s") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle_1: player,
              rectangle_2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 4,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving == true) {
          movables.forEach((moveable) => {
            moveable.position.y -= 4;
          });
        }
      }

      if (keys.a.pressed && lastKey == "a") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle_1: player,
              rectangle_2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 4,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving == true) {
          movables.forEach((moveable) => {
            moveable.position.x += 4;
          });
        }
      }

      if (keys.d.pressed && lastKey == "d") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle_1: player,
              rectangle_2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 4,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving == true) {
          movables.forEach((moveable) => {
            moveable.position.x -= 4;
          });
        }
      }
    }

    gameLoop();
  },
};
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
