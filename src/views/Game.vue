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

import outdoorTheme from "@/assets/audio/OutdoorTheme.mp3";
import indoorTheme from "@/assets/audio/IndoorTheme.mp3";
import Radio from "@/components/Radio.vue";

import { mapGetters } from 'vuex';
import { dayNightCycle } from '@/logic/day-night-cycle.js';
import { getOtherPlayers } from '@/logic/other-players.js';
import { Sprite } from '@/logic/sprite.js'
import { createBoundry } from "@/logic/boundry";
import { movePlayer } from '@/logic/player';

export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
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
  },


 async mounted() {
    const vm = this;

    // Start Outdoor music upon mounting of DOM element
    let startRadio = false;
    if (!startRadio) {
      startRadio = true;
      this.outdoorThemeSong.play();
      this.outdoorThemePlaying = true;
    }

    //Setup of the canvas and its offset
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const offset = {
      x: -2560,
      y: -1880,
    };
  
    this.otherPlayers = await getOtherPlayers();
    console.log("Fetched player 2 data:", this.otherPlayers); 

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

    // PLayer selected sprite -> Impacts which character sprite will be loaded for the champion
    let playerSelectedProfile = 'profile_' +  this.player.sprite;

    // Get player character sprite sheet depending on player profile selection
    const playerSprites = {
      up: getImage(this[playerSelectedProfile].up),
      down: getImage(this[playerSelectedProfile].down),
      left: getImage(this[playerSelectedProfile].left),
      right: getImage(this[playerSelectedProfile].right),
    };

    // Create Map object
    const map = new Sprite({
      image: mapImage,
      position: {
        x: offset.x,
        y: offset.y,
      },
    });

    // Create foregroundMap object
    const mapForeground = new Sprite({
      image: mapForegroundImage,
      position: {
        x: offset.x,
        y: offset.y,
      },
    });
    
    // Create Player - Default player position and sprite direction
    const playerImage = playerSprites.down;
    const playerOffset = { x: 40, y: 50 };

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
    
    //Create Player movement boundries
    const boundaries = createBoundry(offset); 

    //Game Loop
    function game() {
      window.requestAnimationFrame(game);
      map.draw(ctx);
      player.draw(ctx);
      mapForeground.draw(ctx);
      boundaries.forEach((boundary) => {
        boundary.draw(ctx);
      });

      dayNightCycle(playerOffset, ctx, offset, map);
      // Move player
      movePlayer(player, playerSprites, boundaries, ctx, vm);
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
  <Radio :isPlaying="isPlaying" @click="togglePlay" />
  <canvas class="canvas"></canvas>
</template>

<style scoped>
.canvas {
  border: 8px double #15a068;
}
</style>
