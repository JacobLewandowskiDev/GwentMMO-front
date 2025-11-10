// npc.js
import { Sprite } from "@/logic/sprite.js";

export class NPC {
  constructor(data, npcSprites, drawingOffset, canvas) {
    this.name = data.name;
    this.dialog = data.dialog;
    this.position = {
      x: data.position.positionX,
      y: data.position.positionY,
    };

    this.sprite = new Sprite({
      image: npcSprites.down,
      position: {
        x: this.position.x - drawingOffset.x,
        y: this.position.y - drawingOffset.y,
      },
      frames: { max: 4 },
      npcSprites: {
        up: npcSprites.up,
        down: npcSprites.down,
        left: npcSprites.left,
        right: npcSprites.right,
      },
      username: this.name,
    });
  }

  draw(ctx) {
    this.sprite.draw(ctx);
    this.sprite.drawUsername(ctx);
  }
}

export function loadNPCs(npcData, npcSprites, drawingOffset, canvas) {
  const npcs = [];
  for (const npcInfo of npcData) {
    const npcSpriteSet = npcSprites[npcInfo.sprite];
    const npc = new NPC(npcInfo, npcSpriteSet, drawingOffset, canvas);
    npcs.push(npc);
  }
  return npcs;
}

export function drawNPCs(ctx, npcs) {
  for (const npc of npcs) {
    npc.draw(ctx);
  }
}
