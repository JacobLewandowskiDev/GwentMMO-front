import { Sprite } from '@/logic/sprite.js';

const otherPlayers = new Map();
var rawPlayerList = [];

export async function getOtherPlayers(vm, excludeId) {
  try {
    const response = await fetch("http://localhost:8080/game", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`Error fetching players: ${response.statusText}`);

    const players = await response.json();
    rawPlayerList = players;

    players.forEach((player) => {
      if (player.id === excludeId) return;

      const profileKey = "profile_" + player.sprite;
      if (!vm[profileKey]) {
        console.warn(`Missing sprite profile for player ${player.id}`);
        return;
      }

      const playerSprites = {
        up: getImage(vm[profileKey].up),
        down: getImage(vm[profileKey].down),
        left: getImage(vm[profileKey].left),
        right: getImage(vm[profileKey].right),
      };

      if (otherPlayers.has(player.id)) {
        const existingPlayer = otherPlayers.get(player.id);
        existingPlayer.targetX = player.positionX;
        existingPlayer.targetY = player.positionY;
      } else {
        const playerSprite = new Sprite({
          image: playerSprites.down,
          position: { x: player.positionX, y: player.positionY },
          frames: { max: 4, val: 0 },
          playerSprites,
          username: player.username,

          // Smooth movement targets
          targetX: player.positionX,
          targetY: player.positionY
        });

        otherPlayers.set(player.id, playerSprite);
      }
    });
  } catch (error) {
    console.error("Error fetching other players:", error);
  }

  return otherPlayers;
}

function getImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export function drawOtherPlayers(ctx, otherPlayers) {
  otherPlayers.forEach((sprite) => {
    if (sprite.targetX != null && sprite.targetY != null) {
      const dx = sprite.targetX - sprite.position.x;
      const dy = sprite.targetY - sprite.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 2.65;
      const snapThreshold = 2;

      if (distance > snapThreshold) {
        sprite.position.x += (dx / distance) * speed;
        sprite.position.y += (dy / distance) * speed;
        sprite.moving = true;

        if (sprite.playerSprites) {
          if (Math.abs(dx) > Math.abs(dy)) {
            sprite.image = dx > 0 ? sprite.playerSprites.right : sprite.playerSprites.left;
          } else {
            sprite.image = dy > 0 ? sprite.playerSprites.down : sprite.playerSprites.up;
          }
        }
      } else {
        sprite.position.x = sprite.targetX;
        sprite.position.y = sprite.targetY;
        sprite.moving = false;
      }
    }

    // Sprite.draw() now handles animation based on sprite.moving
    sprite.draw(ctx);
    sprite.drawUsername(ctx);
  });
}



export function removeOtherPlayer(playerId) {
  if (otherPlayers.has(playerId)) {
    otherPlayers.delete(playerId);
    rawPlayerList = rawPlayerList.filter(p => p.id !== playerId);
    console.log("Removing disconnected player:", playerId);
  }
}

export function updateOtherPlayerPosition(movementData, otherPlayers) {
  const playerSprite = otherPlayers.get(movementData.playerId);
  if (playerSprite) {
    playerSprite.targetX = movementData.playerPositionX;
    playerSprite.targetY = movementData.playerPositionY;
  }
}

export function getRawPlayersList() {
  return rawPlayerList.map((player) => ({
    username: player.username,
    wins: player.scoreboard?.wins || 0,
    losses: player.scoreboard?.losses || 0,
  }));
}
