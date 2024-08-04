<script>
import collisions from '@/data/collisions'
export default {
    data() {
        return {
            collisions: collisions
        }
    },
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
        window.collisions = this.collisions;
        
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