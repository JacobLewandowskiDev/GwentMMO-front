<script>
export default {
  data() {},
};
</script>

<template>
  <div v-if="stage === menu" class="menu">
    <div class="menu__welcome">
      <img
        class="menu__welcome__bg-img"
        src="/src/assets/images/menu_bg.png"
      />
      <h2 class="menu__welcome__press-enter">Press Enter To Start</h2>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: relative;
  width: 100vw;
  height: 99vh;
  border: 2px solid green;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.menu__welcome {
  width: 100%;
  height: 100%;
  border: 2px solid orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu__welcome__bg-img {
  max-width: 100%;
  max-height: 100%;
  border: 2px solid yellow;
  z-index: -1;
}

.menu__welcome__press-enter {
  position: absolute;
  text-wrap: nowrap;
  bottom: 15%;
  font-size: 2.5rem;
  color: #2dde96;
  background-color: #3f3f3f86;
  border-top: 0.1rem solid #e0e0e0;
  border-bottom: 0.1rem solid #e0e0e0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>
