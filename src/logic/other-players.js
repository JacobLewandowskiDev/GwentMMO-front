import { Sprite } from '@/logic/sprite.js';

// List of other players on the server
const otherPlayers = new Map();
var rawPlayerList = [];

// Get a list of all Players on the server.
 export async function getOtherPlayers(vm, excludeId) {
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
      const players = await response.json();
      rawPlayerList = players;
      
     players.forEach(player => {
      if (player.id === excludeId) return;

      const profileKey = 'profile_' + player.sprite;

      const playerSprites = {
        up: getImage(vm[profileKey].up),
        down: getImage(vm[profileKey].down),
        left: getImage(vm[profileKey].left),
        right: getImage(vm[profileKey].right),
      };


     const playerSprite = new Sprite({
      image: playerSprites.down, // or any direction
      position: {
        x: player.positionX,
        y: player.positionY
      },
      frames: { max: 4 },
      playerSprites,
      username: player.username
    });

      otherPlayers.set(player.id, playerSprite);
      console.log("Creating sprite for", player);
    });

  } catch (error) {
    console.error("Error:", error);
  }
    return otherPlayers;
}

function getImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

// Resetoffset, because it is already acounted for in the original draw method
const otherPlayerOffset = {
  x: 0,
  y: 0
}

export function drawOtherPlayers(ctx) {
  for (const [, playerSprite] of otherPlayers.entries()) {
    playerSprite.draw(ctx, otherPlayerOffset);
    playerSprite.drawUsername(ctx, otherPlayerOffset);
    console.log("Drawing:", playerSprite.username, playerSprite.position, playerSprite.Image);
  }
}

export function getRawPlayersList() {
  return rawPlayerList.map(player => ({
    username: player.username,
    wins: player.scoreboard?.wins || 0,
    losses: player.scoreboard?.losses || 0
  }));
}