<script>
import map_imgSrc from "@/assets/images/gwent_tavern_map.png";
import map_foreground_imgSrc from "@/assets/images/tavern_map_foreground.png";
import profile_1_imgSrc from "@/assets/images/profileSprites/profile_1.png";
import profile_2_imgSrc from "@/assets/images/profileSprites/profile_2.png";
import profile_3_imgSrc from "@/assets/images/profileSprites/profile_3.png";
import profile_4_imgSrc from "@/assets/images/profileSprites/profile_4.png";
import profile_5_imgSrc from "@/assets/images/profileSprites/profile_5.png";
import profile_6_imgSrc from "@/assets/images/profileSprites/profile_6.png";

import profile_1_up_imgSrc from "@/assets/images/charSprites/profile_1_up.png";
import profile_1_down_imgSrc from "@/assets/images/charSprites/profile_1_down.png";
import profile_1_left_imgSrc from "@/assets/images/charSprites/profile_1_left.png";
import profile_1_right_imgSrc from "@/assets/images/charSprites/profile_1_right.png";

import profile_2_up_imgSrc from "@/assets/images/charSprites/profile_2_up.png";
import profile_2_down_imgSrc from "@/assets/images/charSprites/profile_2_down.png";
import profile_2_left_imgSrc from "@/assets/images/charSprites/profile_2_left.png";
import profile_2_right_imgSrc from "@/assets/images/charSprites/profile_2_right.png";

import profile_3_up_imgSrc from "@/assets/images/charSprites/profile_3_up.png";
import profile_3_down_imgSrc from "@/assets/images/charSprites/profile_3_down.png";
import profile_3_left_imgSrc from "@/assets/images/charSprites/profile_3_left.png";
import profile_3_right_imgSrc from "@/assets/images/charSprites/profile_3_right.png";

import profile_4_up_imgSrc from "@/assets/images/charSprites/profile_4_up.png";
import profile_4_down_imgSrc from "@/assets/images/charSprites/profile_4_down.png";
import profile_4_left_imgSrc from "@/assets/images/charSprites/profile_4_left.png";
import profile_4_right_imgSrc from "@/assets/images/charSprites/profile_4_right.png";

import profile_5_up_imgSrc from "@/assets/images/charSprites/profile_5_up.png";
import profile_5_down_imgSrc from "@/assets/images/charSprites/profile_5_down.png";
import profile_5_left_imgSrc from "@/assets/images/charSprites/profile_5_left.png";
import profile_5_right_imgSrc from "@/assets/images/charSprites/profile_5_right.png";

import profile_6_up_imgSrc from "@/assets/images/charSprites/profile_6_up.png";
import profile_6_down_imgSrc from "@/assets/images/charSprites/profile_6_down.png";
import profile_6_left_imgSrc from "@/assets/images/charSprites/profile_6_left.png";
import profile_6_right_imgSrc from "@/assets/images/charSprites/profile_6_right.png";

import collisions from "@/data/collisions";
import outdoorTheme from "@/assets/audio/OutdoorTheme.mp3";
import indoorTheme from "@/assets/audio/IndoorTheme.mp3";
import Radio from "@/components/Radio.vue";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
      collisions,
      otherPlayers: [],

      profile_1: {
        sprite: profile_1_imgSrc,
        up: profile_1_up_imgSrc,
        down: profile_1_down_imgSrc,
        left: profile_1_left_imgSrc,
        right: profile_1_right_imgSrc
      },
      profile_2: {
        sprite: profile_2_imgSrc,
        up: profile_2_up_imgSrc,
        down: profile_2_down_imgSrc,
        left: profile_2_left_imgSrc,
        right: profile_2_right_imgSrc
      },
      profile_3: {
        sprite: profile_3_imgSrc,
        up: profile_3_up_imgSrc,
        down: profile_3_down_imgSrc,
        left: profile_3_left_imgSrc,
        right: profile_3_right_imgSrc
      },
      profile_4: {
        sprite: profile_4_imgSrc,
        up: profile_4_up_imgSrc,
        down: profile_4_down_imgSrc,
        left: profile_4_left_imgSrc,
        right: profile_4_right_imgSrc
      },
      profile_5: {
        sprite: profile_5_imgSrc,
        up: profile_5_up_imgSrc,
        down: profile_5_down_imgSrc,
        left: profile_5_left_imgSrc,
        right: profile_5_right_imgSrc
      },
      profile_6: {
        sprite: profile_6_imgSrc,
        up: profile_6_up_imgSrc,
        down: profile_6_down_imgSrc,
        left: profile_6_left_imgSrc,
        right: profile_6_right_imgSrc
      },

      isPlaying: true,
      outdoorThemePlaying: false,

      outdoorThemeSong: new Howl({
        src: outdoorTheme,
        html5: true,
        loop: true,
        volume: 0.5,
      }),

      indoorThemeSong: new Howl({
        src: indoorTheme,
        html5: true,
        loop: true,
        volume: 0.25,
      }),
    };
  },


  components: {
    Radio,
  },

  computed: {
    // Get the controllable player data
    ...mapGetters(['getPlayerData']),
    player() {
      return this.getPlayerData;
    },
  },

  methods: {
    togglePlay() {
      if (this.outdoorThemePlaying && this.isPlaying) {
        this.outdoorThemeSong.pause();
        this.isPlaying = false;
        return;

      } else if (this.outdoorThemePlaying && !this.isPlaying) {
        this.outdoorThemeSong.play();
        this.isPlaying = true;
        return;
      }

      if (!this.outdoorThemePlaying && this.isPlaying) {
        this.indoorThemeSong.pause();
        this.isPlaying = false;
        return;

      } else if (!this.outdoorThemePlaying && !this.isPlaying) {
        this.indoorThemeSong.play();
        this.isPlaying = true;
        return;
      }
      this.$emit("toggle-play");
    },

    // Display Player name above character
    async getOtherPlayers() {
      try {
        const response = await fetch("http://localhost:8080/game", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

        if (!response.ok) {
          throw new Error(`Error fetching players: ${response.statusText}`);
        }

        // Process the JSON data
        this.otherPlayers = await response.json();
        
        return this.otherPlayers; // Or return if you're calling this from another function 
      } catch (error) {
        console.error("Error:", error);
      }
    }
  },


 async mounted() {
    const vm = this;

    await this.getOtherPlayers();
    console.log("Fetched player 2 data:", this.otherPlayers); 



    // Start Outdoor music upon mounting of DOM element
    let startRadio = false;
    if (!startRadio) {
      startRadio = true;
      this.outdoorThemeSong.play();
      this.outdoorThemePlaying = true;
    }

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const offset = {
      x: -2560,
      y: -1880,
    };

    //Return the image based on img.src
    function getImage(imgSrc) {
      const image = new Image();
      image.src = imgSrc;
      return image;
    }

    // Create subarrays for event tiles by slicing main array by num of columns in map (70)
    function createTileSubArrays(dataArray, newArray) {
      for (let i = 0; i < dataArray.length; i += 70) {
        newArray.push(dataArray.slice(i, 70 + i));
      }
    }

    // Create subarrays of collision tiles
    const collisionsMap = [];
    createTileSubArrays(collisions, collisionsMap);

    //Create new Boundary Class (Tile width & Height = 32px * 270%(Zoom in on map))
    class Boundary {
      static eventTileWidth = 32 * 2.7;
      static eventTileHeight = 32 * 2.7;
      constructor({ position }) {
        this.position = position;
        this.width = Boundary.eventTileWidth;
        this.height = Boundary.eventTileHeight;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    // Map Image
    const mapImage = getImage(map_imgSrc);

    // Foreground Image
    const mapForegroundImage = getImage(map_foreground_imgSrc);

    // Player Sprites (added from _1 to _5 depending on which sprite was chosen in character creation)
    let playerSelectedProfile = 'profile_' +  this.player.sprite;

    const playerSprites = {
      up: getImage(this[playerSelectedProfile].up),
      down: getImage(this[playerSelectedProfile].down),
      left: getImage(this[playerSelectedProfile].left),
      right: getImage(this[playerSelectedProfile].right),
    };

    //Create new Sprite Class
    class Sprite {
      constructor({ image, position, frames = { max: 1 } }) {
        this.image = image;
        this.position = position;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
        this.moving = false;
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );

        if (this.moving) {
          if (this.frames.max > 1) {
            this.frames.elapsed++;
          }

          if (this.frames.elapsed % 10 == 0) {
            if (this.frames.val < this.frames.max - 1) {
              this.frames.val++;
            } else {
              this.frames.val = 0;
            }
          }
        }
      }
    }

    //Create Map & player object
    const map = new Sprite({
      image: mapImage,
      position: {
        x: offset.x,
        y: offset.y,
      },
    });

    const mapForeground = new Sprite({
      image: mapForegroundImage,
      position: {
        x: offset.x,
        y: offset.y,
      },
    });

    const playerImage = playerSprites.down;
    const playerOffset = { x: 40, y: 50 };

    // Create Player
    const player = new Sprite({
      image: playerImage,
      position: {
        x: canvas.width / 2 - playerImage.width / 8 - playerOffset.x,
        y: canvas.height / 2 - playerImage.height / 2 - playerOffset.y,
      },
      frames: { max: 4 },
      playerSprites: {
        up: playerSprites.up,
        down: playerSprites.down,
        left: playerSprites.left,
        right: playerSprites.right,
      },
    });

    const boundaries = [];

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol == 2513) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.eventTileHeight + offset.x,
                y: i * Boundary.eventTileWidth + offset.y,
              },
            })
          );
        }
      });
    });

    // Candle lights locations for in-game night time
    const circleXY = [
      { x: -405 - playerOffset.x, y: -395 },
      { x: 200 - playerOffset.x, y: -395 },
      { x: 1238 - playerOffset.x, y: -395 },
      { x: 1238 - playerOffset.x, y: -1000 },
      { x: 808 - playerOffset.x, y: -1000 },
      { x: 720 - playerOffset.x, y: -1000 },
      { x: 2830 - playerOffset.x, y: -1000 },
      { x: 200 - playerOffset.x, y: -1000 },
      { x: 290 - playerOffset.x, y: -1000 },
    ];

    const candleLight_1 = {
      radius: 10,
      fillStyle: "rgba(238,153,17, 0.4)",
    };

    const candleLight_2 = {
      radius: 50,
      fillStyle: "rgba(238,153,17, 0.2)",
    };

    // Draw the lights for the candles
    function lights(radius, fillStyle) {
      ctx.beginPath();

      circleXY.forEach(({ x, y }) => {
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      });

      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.strokeStyle = fillStyle;
      ctx.stroke();
    }

    // Check users time of day, and change in-game day/night cycle to match
    function dayNightCycle() {
      const date = new Date();
      let timeOfDay = date.getHours();
      let isDaytime = timeOfDay >= 7 && timeOfDay < 19;

      if (isDaytime) {
        ctx.fillStyle = "rgba(12, 20, 124, 0)";
      } else {
        ctx.fillStyle = "rgba(12, 20, 124, 0.5)";
        ctx.fillRect(offset.x, offset.y, map.width, map.height);
        lights(candleLight_2.radius, candleLight_2.fillStyle);
        lights(candleLight_1.radius, candleLight_1.fillStyle);
      }
    }

    // Player movement
    let keys = {
      w: { pressed: false },
      s: { pressed: false },
      a: { pressed: false },
      d: { pressed: false },
    };

    let lastKey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
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
      switch (e.key) {
        case "w":
          keys.w.pressed = false;
          player.moving = false;
          player.frames.val = 0;
          break;

        case "s":
          keys.s.pressed = false;
          player.moving = false;
          player.frames.val = 0;
          break;

        case "a":
          keys.a.pressed = false;
          player.moving = false;
          player.frames.val = 0;
          break;

        case "d":
          keys.d.pressed = false;
          player.moving = false;
          player.frames.val = 0;
          break;
      }
    });

    let isPlayerInside = false;

    function changeSongs() {
      const playerX = player.position.x;
      const playerY = player.position.y;

      // Determine if the player is inside or outside
      const insideBoundary = playerX < 800 && playerX > 440 && playerY < -330;
      const outsideBoundary = playerX < 800 && playerX > 440 && playerY > -130;

      if (insideBoundary && !isPlayerInside && vm.outdoorThemePlaying) {
        vm.outdoorThemeSong.pause();
        if(vm.isPlaying) {
          vm.indoorThemeSong.play();
        }
        vm.outdoorThemePlaying = false;
        isPlayerInside = true; // Update state to inside
      } else if (outsideBoundary && isPlayerInside && !vm.outdoorThemePlaying) {
        vm.indoorThemeSong.pause();
        if(vm.isPlaying) {
          vm.outdoorThemeSong.play();
        }
        vm.outdoorThemePlaying = true;
        isPlayerInside = false; // Update state to outside
      }
    }

    function move() {
      let moving = true;
      if (keys.w.pressed && lastKey == "w") {
        player.image = playerSprites.up;
        changeSongs();
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            playerCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 4,
                },
              },
            })
          ) {
            moving = false;
            player.moving = false;
            player.frames.val = 0;
            break;
          }
        }
        if (moving == true) {
          player.position.y -= 4;
          ctx.translate(0, 4);
          player.moving = true;
        }
      }

      if (keys.s.pressed && lastKey == "s") {
        player.image = playerSprites.down;
        changeSongs();
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            playerCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 4,
                },
              },
            })
          ) {
            moving = false;
            player.moving = false;
            player.frames.val = 0;
            break;
          }
        }
        if (moving == true) {
          player.position.y += 4;
          ctx.translate(0, -4);
          player.moving = true;
        }
      }

      if (keys.a.pressed && lastKey == "a") {
        player.image = playerSprites.left;
        changeSongs();
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            playerCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x + 4,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            player.moving = false;
            player.frames.val = 0;
            break;
          }
        }
        if (moving == true) {
          player.position.x -= 4;
          ctx.translate(4, 0);
          player.moving = true;
        }
      }

      if (keys.d.pressed && lastKey == "d") {
        player.image = playerSprites.right;
        changeSongs();
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            playerCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x - 4,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            player.moving = false;
            player.frames.val = 0;
            break;
          }
        }
        if (moving == true) {
          player.position.x += 4;
          ctx.translate(-4, 0);
          player.moving = true;
        }
      }
    }

    //For testing purposes only (remove once everything works as should)
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        console.log(
          "Player_1 Position: X:" +
            player.position.x +
            ", Y:" +
            player.position.y
        );
        console.log(
          "Canvas Position: X:" + map.position.x + ", Y:" + map.position.y
        );
      }
    });

    //Check if player is in range of collisions or interactible objects
    function playerCollision({ player, boundary }) {
      return (
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width &&
        player.position.y >= boundary.position.y - boundary.height &&
        player.position.y - player.width <= boundary.position.y
      );
    }

    //Game Loop
    function game() {
      window.requestAnimationFrame(game);
      map.draw();
      player.draw();
      mapForeground.draw();
      boundaries.forEach((boundary) => {
        boundary.draw();
      });

      dayNightCycle();
      // Move player
      move();
    }
    //Initiate the Game once
    let runOnce = false;
    if (!runOnce) {
      game();
    }

    //Re-draw everything (When user comes back from a game of gwent)
    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game();
    }
  },
};
</script>

<template>
  <Radio :isPlaying="isPlaying" @click="togglePlay" />
  <canvas class="canvas"></canvas>
</template>

<style scoped>
.canvas {
  border: 8px double #15a068;
}
</style>
