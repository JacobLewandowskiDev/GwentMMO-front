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

import { mapGetters, mapActions } from 'vuex';
import { dayNightCycle } from '@/logic/day-night-cycle.js';
import { getOtherPlayers } from '@/logic/other-players.js';
import { Sprite } from '@/logic/sprite.js'
import { createBoundry } from "@/logic/boundry";
import { createPlayer, movePlayer } from '@/logic/player';
import { handleKeyDown, handleKeyUp } from '@/logic/player.js';

export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
      playerData: null,
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
    ...mapGetters(['updatePlayerData', 'getPlayerData', 'getSocket']),
    player() {
      return this.getPlayerData;
    },

    playerSocket() {
      return this.getSocket;
    }
  },

  mounted() {
    const socket = this.playerSocket;

    if (socket) {
      socket.connect({}, (frame) => {
        socket.subscribe("/topic/player-updates", (message) => {
          const data = JSON.parse(message.body);
          console.log("Player update received:", data);

          // Handle player updates (e.g., update position, stats, etc.)
          this.updatePlayerData(data);
        });
      });

      socket.subscribe('/topic/movement', (message) => {
        const movementData = JSON.parse(message.body);
        this.updatePlayerPosition(movementData);
      });
    }
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

    ...mapActions(["updateSocket"]),

    updatePlayerPosition(movementData) {
      console.log("Movement data received:", movementData);
    },

    handleBeforeUnload() {
      console.log("Before unload triggered");
      this.disconnectWebSocket();
    },

    disconnectWebSocket() {
      if (this.playerSocket && this.playerSocket.connected) {
      this.playerSocket.send(
         "/app/player-disconnect",
         {},
         JSON.stringify({ playerId: this.playerData.id })
      );

      this.playerSocket.disconnect(() => {
         console.log("WebSocket disconnected successfully");
         this.updateSocket(null); // Clear socket state
      });
      } else {
          console.warn("No active WebSocket connection to disconnect.");
      }
    },
  },

  beforeUnmount() {
    // Remove event listeners when the component is about to unmount
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    this.disconnectWebSocket();
  },

 async mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    this.playerData = this.player;

    if (this.playerSocket) {
    this.playerSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
    };
  } else {
    console.error("WebSocket connection is not available.");
  }

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
    console.log("Fetched controllable player data:", this.playerData); 
    console.log("Fetched all player data:", this.otherPlayers); 

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
    
    // PLayer selected sprite -> Impacts which character sprite will be loaded for the champion
    let playerSelectedProfile = 'profile_' +  this.playerData.sprite;

    // Get player character sprite sheet depending on player profile selection
    const playerSprites = {
      up: getImage(this[playerSelectedProfile].up),
      down: getImage(this[playerSelectedProfile].down),
      left: getImage(this[playerSelectedProfile].left),
      right: getImage(this[playerSelectedProfile].right),
    };

    // Create Player - Default player sprite direction and drawing offset.
    const playerDrawingOffset = { x: 40, y: 50 };

    let playerUsername = this.playerData.username;
    const playerCharacter = await createPlayer(playerSprites, playerDrawingOffset, canvas, playerUsername);

    //For testing purposes only (remove once everything works as should)
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        console.log(
            this.playerData.username +
            " Position: X:" +
            playerCharacter.position.x +
            ", Y:" +
            playerCharacter.position.y
        );
        console.log(
          "Canvas Position: X:" + map.position.x + ", Y:" + map.position.y
        );
      }
    });
    
    //Create Player movement boundries
    const boundaries = createBoundry(offset); 

   //Game Loop
   const game = () => {
      window.requestAnimationFrame(game);
      map.draw(ctx);
      playerCharacter.draw(ctx);
      mapForeground.draw(ctx);
      playerCharacter.drawUsername(ctx);
      boundaries.forEach((boundary) => {
        boundary.draw(ctx);
      });

      dayNightCycle(playerDrawingOffset, ctx, offset, map);
      const socket = this.$store.getters.getSocket; 
      movePlayer(this.player, socket, playerCharacter, playerSprites, boundaries, ctx, vm);
    }

    //Initiate the Game once
    let runOnce = false;
    if (!runOnce) {
      await this.playerData;
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
