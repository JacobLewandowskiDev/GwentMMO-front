// List of other players on the server
let otherPlayers = [];

// Get a list of all Players on the server.
 export async function getOtherPlayers() {
    try {
      const response = await fetch("http://localhost:8080/game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

      if (!response.ok) {
        throw new Error(`Error fetching players: ${response.statusText}`);
      }

      // Process the JSON data
      otherPlayers = await response.json();
      
      return otherPlayers; // Or return if you're calling this from another function 
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function updatePlayerPosition(movementData) {
    const otherPlayer = otherPlayers.find(p => p.id === movementData.playerId);
    if (otherPlayer) {
        // Update existing player's position
        otherPlayer.x = movementData.playerPositionX;
        otherPlayer.y = movementData.playerPositionY;
    } else {
        // Add new player to the list if not found
        otherPlayers.push({
            id: movementData.playerId,
            username: movementData.username,
            x: movementData.playerPositionX,
            y: movementData.playerPositionY
        });
    }
}

// Call this function in your animation loop to draw all players
function drawPlayers(ctx) {
    otherPlayers.forEach(otherPlayer => {
        ctx.drawImage(otherPlayer.sprite, otherPlayer.x, otherPlayer.y); // Render the player's sprite
        // Optionally, draw the username above the player
        ctx.font = '12px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(otherPlayer.username, otherPlayer.x, otherPlayer.y - 10);
    });
}