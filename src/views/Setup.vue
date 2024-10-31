<script>
import Game from "../views/Game.vue";
import { mapActions } from 'vuex';

export default {
  props: {
    stage: {
      type: String,
      required: true,
    },
  },

  components: {
    Game,
  },

  data() {
    return {
      playerData: null,
      username: "",
      currentSprite: 1,
      maxSprite: 6, //Change this value to whatever the number of profile pictures of characters there is
    };
  },

  computed: {
    currentSpriteImg() {
      return "/src/assets/images/profileSprites/profile_" + this.currentSprite + ".png";
    },

    isUsernameValid() {
      const validCharsRegex = /^[a-zA-Z!@#$]+$/;
      return (
        this.username !== "" &&
        this.username.length >= 3 &&
        validCharsRegex.test(this.username) &&
        (this.username.match(/[a-zA-Z]/g) || []).length >= 3
      );
    },
  },

  emits: ["stop-music"],

  methods: {
    ...mapActions(['updatePlayerData']),
    
    getSprite(option) {
      if (option === "prev") {
        this.currentSprite =
          this.currentSprite - 1 < 1 ? this.maxSprite : this.currentSprite - 1;
      } else if (option === "next") {
        this.currentSprite =
          this.currentSprite + 1 > this.maxSprite ? 1 : this.currentSprite + 1;
      }
    },

    // Create a new player, check if username exists (If so, throw error), else GET request to start game and open websocket connection to the server.
    async startGame() {
      if (this.isUsernameValid) {
        const player = { username: this.username, sprite: this.currentSprite };
        console.log(player);
        try {
          const response = await fetch("http://localhost:8080/game", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
          });

          if (response.status === 201) {
            const data = await response.json();

            if (data.username === this.username && data.sprite === this.currentSprite) {
              this.$emit("stop-music"); // Stop Main menu music
              this.updatePlayerData(data);
              this.$router.push({name: 'Game'})
            } else {
              throw new Error("Username or sprite does not match the submitted data.");
            }
          } else {
            alert(
              "User under this username already exists, please pick a different one."
            );
            throw new Error(
              "Username taken - Failed to create new Player, status: " +
                response.status
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("Button is disabled, cannot submit");
      }
    }
  },
};
</script>

<template>
  <h2 class="title">Select your Champion</h2>
  <div class="profile">
    <button class="profile__prev" @click="getSprite('prev')"><</button>
    <img class="profile__img" :src="currentSpriteImg" />
    <button class="profile__next" @click="getSprite('next')">></button>
  </div>

  <h3 class="username-label">Enter your Username:</h3>
  <input
    type="text"
    v-model="username"
    class="username"
    placeholder="Username"
    maxlength="16"
    minlength="4"
  />
  <button
    :disabled="!isUsernameValid"
    :class="{ 'submit-profile--disabled': !isUsernameValid }"
    class="submit-profile"
    @click="startGame"
  >
    Start Game
  </button>
</template>

<style>
.setup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
}

.title {
  color: #f5e8cb;
  padding-bottom: 0.5rem;
}

.profile {
  position: relative;
  width: 20rem;
  height: 17rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile__img {
  width: 13rem;
  height: 15rem;
  z-index: 1;
}

.profile__prev,
.profile__next {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 2rem;
  border: 0.2rem solid #7d451c;
  background-color: #ceba97;
  color: #8b5229;
  border-radius: 0.5rem;
  cursor: pointer;
}

.profile__prev:active,
.profile__next:active {
  border: 0.2rem solid #945122;
  background-color: #ddc8a3;
  color: #a36132;
}

.username-label {
  padding-bottom: 0.5rem;
  color: #f5e8cb;
}

.username {
  font-family: "Caudex", "Times New Roman", Times, serif;
  text-align: center;
  height: 2.5rem;
  width: 15rem;
  background-color: #ddccae;
  border: 0.2rem solid #7d451c;
  border-radius: 0.2rem;
  color: #000000;
  font-weight: 900;
  letter-spacing: 0.1rem;
}

.username:focus {
  outline: none;
}

.username::placeholder {
  color: #363636;
}

.submit-profile {
  background: linear-gradient(
    166deg,
    rgb(58, 153, 78) 42%,
    rgb(38, 109, 48) 98%
  );
  color: #eec50f;
  border: 0.1rem solid #7eda91;
  border-radius: 0.3rem;
  font-weight: bold;
  cursor: pointer;
  width: 10rem;
  height: 2rem;
  margin-top: 0.5rem;
}

.submit-profile:active {
  background: linear-gradient(
    166deg,
    rgb(58, 153, 78) 42%,
    rgb(38, 109, 48) 98%
  );
  border: 0.1rem solid #93fca9;
  color: #ffd000;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(147, 252, 169, 1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(147, 252, 169, 1);
  box-shadow: 0px 0px 20px 0px rgba(147, 252, 169, 1);
}

.submit-profile--disabled,
.submit-profile--disabled:active {
  background: linear-gradient(
    166deg,
    rgb(107, 110, 108) 42%,
    rgb(85, 87, 85) 98%
  );
  border: 0.1rem solid #979696;
  color: #9c9c9c;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  cursor: initial;
}
</style>
