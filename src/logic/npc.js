import { Sprite } from "@/logic/sprite.js";

export class NPC {
  constructor(data, npcSprites) {
    this.name = data.name;
    this.dialog = data.dialog;
    this.position = {
      x: data.position.positionX,
      y: data.position.positionY,
    };

    // Assign already preloaded images
    this.sprite = new Sprite({
      image: npcSprites.down,   // down is preloaded
      position: this.position,
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
    this.sprite.draw(ctx);      // absolute positions
    this.sprite.drawUsername(ctx);
  }
}

// Preload a single image
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// Load all NPCs with preloaded images
export async function loadNPCs(npcData, npcSprites) {
  const npcs = [];

  for (const npcInfo of npcData) {
    const spriteSet = npcSprites[npcInfo.sprite];

    const preloadedSprites = {
      up: await preloadImage(spriteSet.up.src || spriteSet.up),
      down: await preloadImage(spriteSet.down.src || spriteSet.down),
      left: await preloadImage(spriteSet.left.src || spriteSet.left),
      right: await preloadImage(spriteSet.right.src || spriteSet.right),
    };

    const npc = new NPC(npcInfo, preloadedSprites);
    npcs.push(npc);
  }

  return npcs;
}

export function drawNPCs(ctx, npcs) {
  for (const npc of npcs) {
    npc.draw(ctx);   // draw at absolute JSON coordinates
  }
}
