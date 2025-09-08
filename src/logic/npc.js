import { Sprite } from "@/logic/sprite.js";

// Create NPC Character
  export function createNPC(npcSprites, drawingOffset, canvas, npcName) {
    const npc = new Sprite({
      image: npcSprites.down,
      position: {
        x: canvas.width / 2 - npcSprites.down.width / 8 - drawingOffset.x,
        y: canvas.height / 2 - npcSprites.down.height / 2 - drawingOffset.y,
      },
      frames: { max: 4 },
      npcSprites: {
        up: npcSprites.up,
        down: npcSprites.down,
        left: npcSprites.left,
        right: npcSprites.right,
      },
      username: npcName
    });

    return npc;
  }