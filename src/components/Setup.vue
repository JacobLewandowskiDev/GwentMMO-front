<script>
export default {
  props: {
    stage: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      username: "",
      profile: "profile_1",
      profiles: [
        "profile_1",
        "profile_2",
        "profile_3",
        "profile_4",
        "profile_5",
        "profile_6",
      ],
    };
  },

  mounted() {},

  computed: {
    imgSrc() {
      return "/src/assets/images/" + this.profile + ".png";
    },

    isUsernameValid() {
      this.username = this.username.trim();
      if (this.username !== "" && this.username.length >= 3) {
        return this.username;
      }
    },

    isDisabled() {
      return this.isUsernameValid;
    },
  },
};
</script>

<template>
  <h2 class="title">Select your Champion</h2>
  <div class="profile">
    <img class="profile__img" :src="imgSrc" />
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
    :disabled="isDisabled"
    :class="{ 'submit-profile--disabled': !isDisabled }"
    class="submit-profile"
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
  padding-bottom: .5rem;
}

.profile {
  width: 13rem;
  height: 15rem;
}

.profile__img {
  width: 100%;
  height: 100%;
  z-index: 1;
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
  margin-top: 0.3rem;
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
