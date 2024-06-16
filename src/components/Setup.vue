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
      sprite: "Sprite_1",
      sprites: ["Sprite_1", "Sprite_2", "Sprite_3", "Sprite_4", "Sprite_5"],
    };
  },

  mounted() {
    console.log(this.stage);
  },

  computed: {
    imgSrc() {
      return "/src/assets/images/" + this.sprite + ".png";
    },
  },
};
</script>

<template>
  <h2 class="setup__title">Select your Champion</h2>
  <br />
  <div class="setup__sprite">
    <img class="setup__sprite__img" :src="imgSrc" />
  </div>
  <br />
  <label class="setup__sprite__label">Enter your Username:</label>
  <input
    type="text"
    v-model="username"
    class="setup__username"
    placeholder="Username"
    maxlength="16"
    minlength="4"
  />
  <button class="setup__submit" v-if="username != '' && username.length >= 4">
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

.setup__title {
  color: #fad222;
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

.setup__sprite__label {
  padding-bottom: 0.5rem;
}

.setup__username {
  font-family: "Caudex", "Times New Roman", Times, serif;
  text-align: center;
  height: 2.5rem;
  width: 15rem;
  background-color: #ffffffe1;
  border: 0.2rem solid #383838;
  border-radius: 0.2rem;
}

.setup__username:focus {
  outline: none;
}

.setup__username::placeholder {
  color: #363636;
}

.setup__submit {
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

.setup__submit:active {
  background: linear-gradient(
    166deg,
    rgb(58, 153, 78) 42%,
    rgb(38, 109, 48) 98%
  );
  border: 0.1rem solid #93fca9;
  color: #ffd000;
}
</style>
