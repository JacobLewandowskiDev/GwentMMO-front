<script>
import map_imgSrc from "@/assets/images/gwent_tavern_map.png";
import map_foreground_imgSrc from "@/assets/images/tavern_map_foreground.png";
import player_downImgSrc from "@/assets/images/playerDown.png";

export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
      player_downImgSrc,
      
    };
  },

  methods() {},

  mounted() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const offset = {
      x: -2500,
      y: -1900,
    };

    //Return the image based on img.src
    function getImage(imgSrc) {
        const image = new Image();
        image.src = imgSrc;
        return image;
    }

    const mapImage = getImage(map_imgSrc);
    const mapForegroundImage = getImage(map_foreground_imgSrc);
    const playerImage = getImage(player_downImgSrc);

    //Create new Sprite Class
    class Sprite {
      constructor({ image, position, frames = { max: 1 } }) {
        this.image = image;
        this.position = position;
        this.frames = frames;
        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
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

    //Create Map & player Sprites
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

    const player = new Sprite({
      image: playerImage,
      position: {
        x: canvas.width / 2 + 264 / 8,
        y: canvas.height / 2 - 79 / 2,
      },
      frames: { max: 4 },
    });

    let keys = {
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

    function move() {
      if (keys.w.pressed && lastKey == "w") {
        player.position.y -= 4;
        canvas.translate
      }
      if (keys.s.pressed && lastKey == "s") {
        player.position.y += 4;
      }
      if (keys.a.pressed && lastKey == "a") {
        player.position.x -= 4;
      }
      if (keys.d.pressed && lastKey == "d") {
        player.position.x += 4;
      }
    }

  

    function positions() {

        console.log(
          "Player Position: X:" +
            player.position.x +
            ", Y:" +
            player.position.y
        );
        console.log(
          "Canvas Position: X:" +
            map.position.x +
            ", Y:" +
            map.position.y
        );
    }

    window.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            positions();
        }});


    //Game Loop
    function game() {
      window.requestAnimationFrame(game);
      map.draw();
      player.draw();
      mapForeground.draw();

      // Move player
      move();



    }
    //Initiate the Game once
    let runOnce = false;
    if (!runOnce) {
      game();
    }
  },
};
</script>

<template>
  <canvas class="canvas"></canvas>
</template>

<style></style>
