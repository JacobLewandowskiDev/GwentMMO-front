<script>
import map_imgSrc from "@/assets/images/gwent_tavern_map.png";
import map_foreground_imgSrc from "@/assets/images/tavern_map_foreground.png";
import instructions_imgSrc from "@/assets/images/instructions.png";
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

import npc1_up_imgSrc from "@/assets/images/charSprites/npc_1_up.png";
import npc1_down_imgSrc from "@/assets/images/charSprites/npc_1_down.png";
import npc1_left_imgSrc from "@/assets/images/charSprites/npc_1_left.png";
import npc1_right_imgSrc from "@/assets/images/charSprites/npc_1_right.png";

import npc2_up_imgSrc from "@/assets/images/charSprites/npc_2_up.png";
import npc2_down_imgSrc from "@/assets/images/charSprites/npc_2_down.png";
import npc2_left_imgSrc from "@/assets/images/charSprites/npc_2_left.png";
import npc2_right_imgSrc from "@/assets/images/charSprites/npc_2_right.png";

import outdoorTheme from "@/assets/audio/OutdoorTheme.mp3";
import indoorTheme from "@/assets/audio/IndoorTheme.mp3";
import Radio from "@/components/Radio.vue";
import PlayerList from "@/components/PlayerList.vue";
import PlayerChat from "@/components/PlayerChat.vue";

import { mapGetters, mapActions } from 'vuex';
import { dayNightCycle } from '@/logic/day-night-cycle.js';
import { otherPlayers, addRawPlayer, drawOtherPlayers, getOtherPlayers, removeOtherPlayer, updateOtherPlayerPosition } from '@/logic/other-players.js';
import { Sprite } from '@/logic/sprite.js'
import { createBoundry } from "@/logic/boundry";
import { createPlayer, movePlayer } from '@/logic/player';
import { handleKeyDown, handleKeyUp } from '@/logic/player.js';
import npcData from "@/data/npcData.json";
import { loadNPCs, drawNPCs } from "@/logic/npc.js";
import { inputMode } from "@/logic/inputMode";


//Return the image based on img.src
    function getImage(imgSrc) {
      const image = new Image();
      image.src = imgSrc;
      return image;
    }


export default {
  data() {
    return {
      map_imgSrc,
      map_foreground_imgSrc,
      instructions_imgSrc,
      playerData: null,
      showPlayerList: false,
      showInstructions: localStorage.getItem('hideInstructions') !== 'true',

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
      
      npcSpriteSets: {
         npc_1: {
          up: getImage(npc1_up_imgSrc),
          down: getImage(npc1_down_imgSrc),
          left: getImage(npc1_left_imgSrc),
          right: getImage(npc1_right_imgSrc)
        },
        npc_2: {
          up: getImage(npc2_up_imgSrc),
          down: getImage(npc2_down_imgSrc),
          left: getImage(npc2_left_imgSrc),
          right: getImage(npc2_right_imgSrc)
        }
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
    PlayerList,
    PlayerChat
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

    closeInstructions() {
      this.showInstructions = false;
      localStorage.setItem('hideInstructions', 'true');
    },

    async loadAllNPCSprites() {
    const preloadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    return {
      npc_1: {
        up: await preloadImage(npc1_up_imgSrc),
        down: await preloadImage(npc1_down_imgSrc),
        left: await preloadImage(npc1_left_imgSrc),
        right: await preloadImage(npc1_right_imgSrc),
      },
      npc_2: {
        up: await preloadImage(npc2_up_imgSrc),
        down: await preloadImage(npc2_down_imgSrc),
        left: await preloadImage(npc2_left_imgSrc),
        right: await preloadImage(npc2_right_imgSrc),
      }
    };
  },

    ...mapActions(["updateSocket"]),

    updatePlayerPosition(movementData) {
      const { playerId, playerPositionX, playerPositionY } = movementData;

      if (playerId !== this.currentPlayer.id) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
          player.positionX = playerPositionX;
          player.positionY = playerPositionY;
        }
      }
    },

    handleKeyPress(e) {
      if(inputMode.mode === 'CHAT') return;
      if (e.key === "p" || e.key === "P") {
        this.showPlayerList = !this.showPlayerList;
      }
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
         this.updateSocket(null);
      });
      } else {
          console.warn("No active WebSocket connection to disconnect.");
      }
    },
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", this.keyUpHandler);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    this.disconnectWebSocket();
  },

 async mounted() {

    this.playerData = this.player;
    if (!this.playerData) {
      console.error("Player data missing, cannot subscribe");
      return;
    }

    const socket = this.playerSocket;
    if (!socket) {
      console.error("WebSocket instance is missing.");
      return;
    }

    const subscribeToTopics = () => {
      console.log("Subscribing to WebSocket topics...");

      // New players joining
     socket.subscribe("/topic/player-updates", (message) => {
      const data = JSON.parse(message.body);

      if (data.playerId === this.playerData.id) return;
      if (otherPlayers.has(data.playerId)) return;

      const profileKey = "profile_" + data.sprite;
      console.log("profileKey lookup:", profileKey, this[profileKey]);

      if (!this[profileKey]) return;

        const playerSprites = {
            up: getImage(this[profileKey].up),
            down: getImage(this[profileKey].down),
            left: getImage(this[profileKey].left),
            right: getImage(this[profileKey].right),
        };

        const playerSprite = new Sprite({
            image: playerSprites.down,
            position: { x: data.positionX, y: data.positionY },
            frames: { max: 4 },
            playerSprites,
            username: data.username,
            targetX: data.positionX,
            targetY: data.positionY
        });

        otherPlayers.set(data.playerId, playerSprite)

        addRawPlayer({
          id: data.playerId,
          username: data.username,
          sprite: data.sprite,
          scoreboard: data.scoreboard || { wins: 0, losses: 0 }
        });
    });

      // Movement updates
      socket.subscribe("/topic/movement", (message) => {
        const movementData = JSON.parse(message.body);
        if (movementData.playerId !== this.playerData.id) {
          updateOtherPlayerPosition(movementData, otherPlayers);
        }
      });

      socket.subscribe("/topic/player-disconnect", (message) => {
        const { playerId } = JSON.parse(message.body);
        removeOtherPlayer(playerId);
      });
    };

    if (socket.connected) {
      subscribeToTopics();
    } else {
      socket.connect({}, (frame) => {
        console.log("Connected to WebSocket:", frame);
        subscribeToTopics();
      });
    }

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("keydown", (e) => handleKeyDown(e));
    this.keyUpHandler = (e) => handleKeyUp(e, playerCharacter, this.playerSocket);
    window.addEventListener("keyup", this.keyUpHandler);
    window.addEventListener("keydown", this.handleKeyPress);

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

    // Create Player - Default player sprite drawing offset.
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

    // Get other players
    const initialPlayersMap = await getOtherPlayers(this, this.playerData.id);
    initialPlayersMap.forEach((sprite, id) => {
        otherPlayers.set(id, sprite);
    });

    //Create the NPC characters
    this.npcSpriteSets = await this.loadAllNPCSprites();
    const npcs = await loadNPCs(npcData, this.npcSpriteSets);

   //Game Loop
   const game = () => {
      window.requestAnimationFrame(game);
      map.draw(ctx);
    
      drawOtherPlayers(ctx, otherPlayers);
      playerCharacter.draw(ctx);
      mapForeground.draw(ctx);
      drawNPCs(ctx, npcs, playerCharacter);
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
  <div class="canvas--container">
    <div v-if="showInstructions" class="canvas--container__instructions">
      <svg @click="closeInstructions" class="canvas--container__instructions__close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
      <img :src="instructions_imgSrc" alt="Movement Instructions" class="canvas__instructions"/>
    </div>
    <PlayerList v-if="showPlayerList"/>
    <canvas class="canvas">
    </canvas>
  </div>
  <PlayerChat :playerSocket="playerSocket" :playerUsername="this.player.username" />
</template>

<style scoped>
.canvas--container {
  width: 1280px;
  height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.canvas {
  border: 8px double #15a068;
}

.canvas--container__instructions {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 100;
}

.canvas--container__instructions__close {
  position: absolute;
  right: 2rem;
  top: 2rem;
  z-index: 110;
  width: 4rem;
  fill: #33e48b;
  cursor: pointer;
}

.canvas--container__instructions__close:hover {
  fill: #90ffc8;
}

.canvas--container__instructions img {
  opacity: .93;
}
</style>