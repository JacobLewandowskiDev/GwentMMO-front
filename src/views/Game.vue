<script>
import map_imgSrc from "@/assets/images/gwent_tavern_map.png";
import map_foreground_imgSrc from "@/assets/images/tavern_map_foreground.png";
import player_upImgSrc from "@/assets/images/playerUp.png";
import player_downImgSrc from "@/assets/images/playerDown.png";
import player_leftImgSrc from "@/assets/images/playerLeft.png";
import player_rightImgSrc from "@/assets/images/playerRight.png";

export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
      player_upImgSrc,
      player_downImgSrc,
      player_leftImgSrc,
      player_rightImgSrc,
    };
  },

  methods: {},

  mounted() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const offset = {
      x: -2525,
      y: -1880,
    };

    //Return the image based on img.src
    function getImage(imgSrc) {
      const image = new Image();
      image.src = imgSrc;
      return image;
    }

    // Map Image
    const mapImage = getImage(map_imgSrc);

    // Foreground Image
    const mapForegroundImage = getImage(map_foreground_imgSrc);

    // Player Sprites (added from _1 to _5 depending on which sprite was chosen in character creation)
    const playerSprites = {
      up: getImage(player_upImgSrc),
      down: getImage(player_downImgSrc),
      left: getImage(player_leftImgSrc),
      right: getImage(player_rightImgSrc),
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
    const player = new Sprite({
      image: playerImage,
      position: {
        x: canvas.width / 2 - playerImage.width / 8,
        y: canvas.height / 2 - playerImage.height / 2,
      },
      frames: { max: 4 },
      playerSprites: {
        up: playerSprites.up,
        down: playerSprites.down,
        left: playerSprites.left,
        right: playerSprites.right,
      },
    });

    // Candle lights for in-game night time
    const circleXY = [
      { x: -408, y: -395 },
      { x: 195, y: -395 },
      { x: 1233, y: -395 },
      { x: 1233, y: -1000 },
      { x: 803, y: -1000 },
      { x: 715, y: -1000 },
      { x: 285, y: -1000 },
      { x: 195, y: -1000 },
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

    function move() {
      if (keys.w.pressed && lastKey == "w") {
        player.image = playerSprites.up;
        player.position.y -= 4;
        ctx.translate(0, 4);
        player.moving = true;
      }

      if (keys.s.pressed && lastKey == "s") {
        player.image = playerSprites.down;
        player.position.y += 4;
        ctx.translate(0, -4);
        player.moving = true;
      }

      if (keys.a.pressed && lastKey == "a") {
        player.image = playerSprites.left;
        player.position.x -= 4;
        ctx.translate(4, 0);
        player.moving = true;
      }

      if (keys.d.pressed && lastKey == "d") {
        player.image = playerSprites.right;
        player.position.x += 4;
        ctx.translate(-4, 0);
        player.moving = true;
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

    //Game Loop
    function game() {
      window.requestAnimationFrame(game);
      map.draw();
      player.draw();
      mapForeground.draw();
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
  <canvas></canvas>
</template>

<style></style>
