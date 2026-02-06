import { Sprite } from "@/logic/sprite.js";

export class NPC {
  constructor(data, npcSprites) {
    this.name = data.name;
    this.dialog = data.dialog;
    this.position = { x: data.position.positionX, y: data.position.positionY };

    this.currentMessage = "";
    this.messageEndTime = 0;
    this.nextMessageTime = 0;

    // Waypoints for walking
    this.waypoints = data.waypoints || [];
    this.currentWaypointIndex = 0;
    this.speed = data.speed || 1.5;
    this.moving = this.waypoints.length > 0;

    this.nextMoveTime = Date.now() + 5000 + Math.random() * 5000; // 5–10s

    const defaultImage = npcSprites?.down || npcSprites?.up || npcSprites?.left || npcSprites?.right || null;

    this.sprite = new Sprite({
      image: defaultImage,
      position: this.position,
      frames: { max: 4 },
      username: this.name,
    });

    this.sprite.npcSprites = {
      up: npcSprites?.up || defaultImage,
      down: npcSprites?.down || defaultImage,
      left: npcSprites?.left || defaultImage,
      right: npcSprites?.right || defaultImage,
    };
  }

  draw(ctx) {
    this.sprite.draw(ctx);
    this.sprite.drawUsername(ctx);

    // Draw message if still active
    if (this.currentMessage && Date.now() < this.messageEndTime) {
      this.drawMessage(ctx);
    } else {
      this.currentMessage = "";
    }

    if (this.moving) {
      this.walk();
    }
  }

  walk() {
    if (!this.waypoints?.length) return;
    const target = this.waypoints[this.currentWaypointIndex];
    if (!target) return;

    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.speed) {
      // Arrived at waypoint
      this.position.x = target.x;
      this.position.y = target.y;
      this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
      this.nextMoveTime = Date.now() + 5000 + Math.random() * 5000;
      this.sprite.moving = false; // stop animation
      return;
    }

    // Only move if nextMoveTime has passed
    if (Date.now() < this.nextMoveTime) {
      this.sprite.moving = false; // idle until next move
      return;
    }

    // Move toward waypoint
    this.position.x += (dx / distance) * this.speed;
    this.position.y += (dy / distance) * this.speed;

    // Update sprite direction
    const s = this.sprite.npcSprites || {};
    const fallback = this.sprite.image;
    if (Math.abs(dx) > Math.abs(dy)) {
      this.sprite.image = dx > 0 ? (s.right || fallback) : (s.left || fallback);
    } else {
      this.sprite.image = dy > 0 ? (s.down || fallback) : (s.up || fallback);
    }

    this.sprite.moving = true; // tell Sprite to animate frames
  }

  drawMessage(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    const x = this.position.x;
    let y = this.position.y - 40;
    const maxWidth = 200;
    const lineHeight = 18;
    const words = this.currentMessage.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && n > 0) {
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  }

  pickRandomDialog() {
    const keys = Object.keys(this.dialog);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return this.dialog[randomKey];
  }
}

export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export async function loadNPCs(npcData, npcSprites) {
  return npcData.map(npcInfo => {
    const spriteSet = npcSprites[npcInfo.sprite] || {};
    return new NPC(npcInfo, spriteSet);
  });
}

export function drawNPCs(ctx, npcs, player) {
  for (const npc of npcs) {
    npc.draw(ctx);

    if (!player?.position) continue;

    const dx = player.position.x - npc.position.x;
    const dy = player.position.y - npc.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 240) {
      const now = Date.now();
      if (now > npc.nextMessageTime) {
        npc.currentMessage = npc.pickRandomDialog();
        npc.messageEndTime = now + 5000; // show for 5s
        npc.nextMessageTime = now + 7000 + Math.random() * 25000; // next message 7–32s
      }
    }
  }
}
