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
}
</script>

<template>
<h1>Welcome {{ username }} </h1>
<img style="width: 12rem;" :src="'/src/assets/images/profile_' + this.profileImg + '.png'"/>
</template>

<style scoped>
</style>