<script>
import Setup from "../views/Setup.vue";
import MainMenu from "@/assets/audio/main_menu.mp3";

export default {
  components: {
    Setup,
  },

  data() {
    return {
      stage: "menu",
      isPlaying: false,
      MainMenu,
      menuMusic: new Howl({
        src: MainMenu,
        html5: true,
        loop: true,
        volume: 0.5,
      }),
    };
  },

  mounted() {
    window.addEventListener("keydown", this.handleClickEnter);
  },

  methods: {
    togglePlay() {
      if (this.isPlaying == true) {
        this.menuMusic.pause();
        this.isPlaying = false;
        return;
      }
      if (!this.isPlaying) {
        this.menuMusic.play();
        this.isPlaying = true;
      }
    },

    playMenuMusic() {
      addEventListener("click", () => {
        if (!this.clicked) {
          this.menuMusic.play();
          this.clicked = true;
        }
      });
    },

    handleClickEnter(event) {
      if (this.stage === "menu" && event.key === "Enter") {
        this.stage = "setup";
        this.menuMusic.stop();
      }
    },
  },
};
</script>

<template>
  <div v-if="stage === 'menu'" class="menu">
    <div class="menu__welcome">
      <img class="menu__welcome__bg-img" src="/src/assets/images/menu_bg.png" />
      <h2 class="menu__welcome__press-enter">Press Enter To Start</h2>
    </div>
    <div class="audio" @click="togglePlay">
      <svg
        v-if="isPlaying"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path
          fill="#2dde96"
          d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
        />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path
          fill="#2dde96"
          d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
        />
      </svg>
    </div>
  </div>

  <div v-if="stage === 'setup'" class="setup">
    <Setup :stage="stage" />
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

.audio {
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 30px;
  left: 30px;
  cursor: pointer;
  background-color: #00000000;
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
