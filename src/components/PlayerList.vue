<script>
</script>

<template>
<div class="playerList">
    <br>
    <h1 class="playerList__title">Player List</h1>
    <br>
    <table class="playerList__table">
        <tr>
            <th>Rank #</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
        </tr>
        <!-- Placeholder data for now !TODO (Implement vue hook to update the list from the database) -->
        <tr> 
            <td>1.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
         <tr>
            <td>4.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>5.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>6.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>7.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>8.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>9.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
        </tr>
          <tr>
            <td>10.</td>
            <td>Geralt</td>
            <td>2</td>
            <td>3</td>
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
        background-color: rgba(0, 0, 0, 0.80);
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