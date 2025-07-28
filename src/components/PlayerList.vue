<script setup>
import { ref, onMounted } from 'vue';
import { getRawPlayersList } from "@/logic/other-players.js";

const players = ref([]);

onMounted(() => {
  players.value = getRawPlayersList();
});
</script>

<template>
<div class="playerList">
    <br>
    <h1 class="playerList__title">ADVENTURERS</h1>
    <br>
    <table class="playerList__table">
        <tr>
            <th>Rank #</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
        </tr>
        <!-- Placeholder data for now !TODO (Implement vue hook to update the list from the database) -->
        <tr v-for="(player, index) in players" :key="index">
            <td>{{ index + 1 }}.</td>
            <td>{{ player.username }}</td>
            <td>{{ player.wins }}</td>
            <td>{{ player.losses }}</td>
        </tr>        
    </table>
</div>
</template>

<style scoped>
    .playerList {
         width: 800px;
        height: 500px; 
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        background-color: #000000cc;
        border: 8px ridge #15a068;
        font-family: "Metamorphous", 'Times New Roman', Times, serif;
        color: #42f1ab;
    }

    .playerList__title {
        width: 100%;
        text-align: center;
        text-decoration: underline;
        text-underline-offset: 10px;
    }

    .playerList__table {
        width: 90%;
        margin: 0 auto;
        border-collapse: collapse;
    }


    .playerList__table th,td {
        border-bottom: 1px solid #196446;
        padding: 5px;
        border-right: 1px solid #196446;
        text-align: center;
        font-size: 1.1rem;
        color: #10e08d;
    }

    .playerList__table th {
        font-size: 1.2rem;
        color: #42f1ab;
        border-bottom: 1px solid #42f1ab;
        border-top: 1px solid #42f1ab;
        border-right: 1px solid #42f1ab;
    }

    .playerList__table th:last-child, .playerList__table td:last-child {
        border-right: none;
    }

    .playerList__table tr:last-child td{
        border-bottom: none;
    }

</style>