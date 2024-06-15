<script>
export default {
  data() {
    return {
      stage: "menu",
      username: "",
      sprite: "Sprite_1",
      sprites: ["Sprite_1", "Sprite_2", "Sprite_3", "Sprite_4", "Sprite_5"],
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleClickEnter);
  },

  computed: {
    imgSrc() {
      return "/src/assets/images/" + this.sprite + ".png";
    },
  },

  methods: {
    handleClickEnter(event) {
      if (this.stage === "menu" && event.key === "Enter") {
        console.log("Enter was clicked");
        this.stage = "setup";
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
      <audio v-if="stage === 'menu'" controls autoplay loop>
      <source src="/src/assets/OST/03 - Gwent Main Menu Theme.mp3" type="audio/mpeg" />
    </audio>
    </div>


  </div>

  <div v-if="stage === 'setup'" class="setup">
    <div class="setup__sprite">
      <img class="setup__sprite__img" :src="imgSrc" />
    </div>
    <label>Select your Champion</label>
    <br />
    <label>Enter your Username:</label>
    <input
      type="text"
      v-model="username"
      class="setup__username"
      placeholder="Username"
      maxlength="16"
    />
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

.setup {
  border: 2px solid yellow;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
}

.setup__sprite {
  border: 2px solid orange;
  width: 13rem;
  height: 15rem;
}

.setup__sprite__img {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.setup__username {
  font-family: "Caudex", "Times New Roman", Times, serif;
  text-align: center;
  height: 2.5rem;
  width: 15rem;
  background-color: #ffffffe1;
  border: 0.3rem double black;
  border-radius: 0.2rem;
}

.setup__username:focus {
  outline: none;
}

.setup__username::placeholder {
  color: #363636;
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
