<script>
import Game from "../views/Game.vue";
import { mapActions } from "vuex";

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
      username: "",
      currentProfile: 1,
      maxProfile: 6, //Change this value to whatever the number of profile pictures of characters there is
    };
  },

  computed: {
    currentProfileImg() {
      return "/src/assets/images/profile_" + this.currentProfile + ".png";
    },

    isUsernameValid() {
      return this.username !== "" && this.username.length >= 3;
    },
  },

  emits: ['stop-music'],


  methods: {
    ...mapActions(["createUser"]),

    getProfile(option) {
      if (option === "prev") {
        this.currentProfile =
          this.currentProfile - 1 < 1
            ? this.maxProfile
            : this.currentProfile - 1;
      } else if (option === "next") {
        this.currentProfile =
          this.currentProfile + 1 > this.maxProfile
            ? 1
            : this.currentProfile + 1;
      }
    },

    createPlayer() {
      if (this.isUsernameValid) {
        this.$emit('stop-music');
        console.log(
          "Creating Player, proceeding to game. Username: " +
            this.username +
            ", profileImg: " +
            this.currentProfile
        );
        this.createUser();
        this.$router.push({
          path: "/game",
          query: { username: this.username, profileImg: this.currentProfile },
        });
      } else {
        console.log("Cannot submit.");
      }
    },

    // async createPlayer() {
    //   if (this.isUsernameValid) {
    //     console.log("Creating Player, proceeding to game. Username: " + this.username + ", profileImg: " + this.currentProfile );
    //     try {
    //       const response = await fetch("/api/createPlayer", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type:": "application/json",
    //         },
    //         body: JSON.stringify({
    //           username: this.username,
    //           profileImg: this.currentProfile,
    //         }),
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //       if (data.exists) {
    //         alert("Username already exists, please enter a new one");
    //       } else {
    //         alert("Creating character, proceeding to game.");
    //       }
    //     } catch (error) {
    //       console.error("There was an error checking the username:", error);
    //     }
    //   } else {
    //     console.log("Button is disabled, cannot submit");
    //   }
    // },
  },
};
</script>

<template>
  <h2 class="title">Select your Champion</h2>
  <div class="profile">
    <button class="profile__prev" @click="getProfile('prev')"><</button>
    <img class="profile__img" :src="currentProfileImg" />
    <button class="profile__next" @click="getProfile('next')">></button>
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
    @click="createPlayer"
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
