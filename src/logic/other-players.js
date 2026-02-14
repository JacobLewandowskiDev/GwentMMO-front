import { Sprite } from '@/logic/sprite.js';
import { reactive } from 'vue';

export const otherPlayers = new Map();
export const rawPlayerList = reactive([]);


export async function getOtherPlayers(vm, excludeId) {
  try {
    const response = await fetch("/gwent/game", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`Error fetching players: ${response.statusText}`);

    const players = await response.json();

    rawPlayerList.splice(0, rawPlayerList.length, ...players);

    otherPlayers.clear();

    players.forEach((player) => {
      if (player.id === excludeId) return;

      const profileKey = "profile_" + player.sprite;
      
      if (!vm[profileKey]) {
        console.warn(`Sprite assets for ${profileKey} not found.`);
        return;
      }

      const playerSprites = {
        up: getImage(vm[profileKey].up),
        down: getImage(vm[profileKey].down),
        left: getImage(vm[profileKey].left),
        right: getImage(vm[profileKey].right),
      };

      const playerSprite = new Sprite({
        image: playerSprites.down,
        position: {
          x: player.positionX,
          y: player.positionY,
        },
        frames: { max: 4 },
        playerSprites,
        username: player.username,
        targetX: player.positionX,
        targetY: player.positionY
      });

      otherPlayers.set(player.id, playerSprite);
    });
    
    console.log("Sync complete. Other players loaded:", otherPlayers.size);
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

    sprite.draw(ctx);
    sprite.drawUsername(ctx);
  });
}

export function addRawPlayer(playerData) {
    const exists = rawPlayerList.some(p => p.id === playerData.id);
    if (!exists) {
        rawPlayerList.push(playerData);
        console.log("Player added to reactive list:", playerData.username);
    }
}

export function removeOtherPlayer(playerId) {
    console.log("Attempting to remove player ID:", playerId);

    const deleted = otherPlayers.delete(playerId) || otherPlayers.delete(Number(playerId)) || otherPlayers.delete(String(playerId));
    
    if (deleted) {
        console.log(`Success: Sprite ${playerId} removed from Canvas.`);
    } else {
        console.warn(`Failure: Sprite ${playerId} not found in Map. Current Map IDs:`, Array.from(otherPlayers.keys()));
    }

    const index = rawPlayerList.findIndex(p => String(p.id) === String(playerId));
    if (index !== -1) {
        rawPlayerList.splice(index, 1);
        console.log(`Success: Player ${playerId} removed from UI List.`);
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
