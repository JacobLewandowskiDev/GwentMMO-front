<script>
import Radio from "@/components/Radio.vue";
import Setup from "../views/Setup.vue";
import MenuTheme from "@/assets/audio/MenuTheme.mp3";

export default {
  components: {
    Setup,
    Radio
  },

  data() {
    return {
      stage: "menu",
      MenuTheme,
      isPlaying: false,
      menuSong: new Howl({
        src: MenuTheme,
        html5: true,
        loop: true,
        volume: 0.7,
      }),
    };
  },

  mounted() {
    window.addEventListener("keydown", this.handleClickEnter);
  },

  methods: {
    togglePlay() {
      if (this.isPlaying == true) {
        this.menuSong.pause();
        this.isPlaying = false;
        return;
      } else {
        this.menuSong.play();
        this.isPlaying = true;
      }
      this.$emit("toggle-play");
    },

    playMenuMusic() {
      addEventListener("click", () => {
        if (!this.clicked) {
          this.menuSong.play();
          this.clicked = true;
        }
      });
    },

    stopMusic() {
      this.menuSong.stop();
      this.isPlaying = false;
    },

    handleClickEnter(event) {
      if (this.stage === "menu" && event.key === "Enter") {
        this.stage = "setup";
      }
    },
  },
};
</script>

<template>
  <Radio :isPlaying="isPlaying" @click="togglePlay"/>
  <div v-if="stage === 'menu'" class="menu">
    <div class="menu__welcome">
      <img class="menu__welcome__bg-img" src="/src/assets/images/menu_bg.png" />
      <h2 class="menu__welcome__press-enter">Press Enter To Start</h2>
    </div>
  </div>

  <div v-if="stage === 'setup'" class="setup">
    <Setup :stage="stage" @stop-music="stopMusic" />
  </div>
</template>

<style scoped>
.menu {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.menu__welcome {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu__welcome__bg-img {
  max-width: 90%;
  max-height: 90%;
  z-index: -1;
}

.menu__welcome__press-enter {
  position: absolute;
  text-wrap: nowrap;
  bottom: 9rem;
  font-size: 2rem;
  color: #2dde96;
  background-color: #3f3f3f86;
  border-top: 0.1rem solid #e0e0e0;
  border-bottom: 0.1rem solid #e0e0e0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

@media screen and (max-width: 768px) {
  .menu__welcome__press-enter h2 {
    font-size: 1.5rem;
  }
}
</style>
