<script>

export default {
    props: {
        username: {
            type: String,
            required: true
        },
        profileImg: {
            type: Number,
            required: true
        }
    },

    mounted() {
        let gameScript = document.createElement('script')
      gameScript.setAttribute('src', 'src/logic/game.js')
      document.head.appendChild(gameScript)
    }
}
</script>

<template>
    <canvas id="myCanvas"></canvas>
</template>

<style scoped>
body {
    * {
        all: initial;
    }
}
.myCanvas {
    border: 2px solid yellow;
}
</style>