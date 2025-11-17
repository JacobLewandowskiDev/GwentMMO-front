export class Sprite {
  constructor({ image, position, frames = { max: 1 }, username = "", playerSprites = null }) {
    this.position = position;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.username = username;
    this.moving = false;
    this.playerSprites = playerSprites;

    if (typeof image === "string") {
      this.image = new Image();
      this.isLoaded = false;
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
        this.isLoaded = true;
      };
      this.image.src = image;
    } else {
      this.image = image;
      if (image.complete) {
        this.isLoaded = true;
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      } else {
        this.isLoaded = false;
        image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
          this.isLoaded = true;
        };
      }
    }
  }

  draw(ctx, offset = { x: 0, y: 0 }) {
    if (!this.isLoaded) return;

    ctx.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.width,
      this.height,
      this.position.x + offset.x,
      this.position.y + offset.y,
      this.width,
      this.height
    );

    if (!this.frames.lastFrameTime) this.frames.lastFrameTime = performance.now();
    if (!this.frames.frameDuration) this.frames.frameDuration = 150;

    if (this.moving) {
      const now = performance.now();
      if (now - this.frames.lastFrameTime >= this.frames.frameDuration) {
        this.frames.val = (this.frames.val + 1) % this.frames.max;
        this.frames.lastFrameTime = now;
      }
    } else {
      this.frames.val = 0;
      this.frames.lastFrameTime = performance.now();
    }
  }


  drawUsername(ctx) {
  if (!this.username) return;

  ctx.font = "400 1.3rem Bangers";
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  const textX = this.position.x + this.width / 2;
  const textY = this.position.y - 10;

  const textWidth = ctx.measureText(this.username).width;
  const padding = 5;
  const rectX = textX - textWidth / 2 - padding;
  const rectY = textY - 18 - padding;
  const rectWidth = textWidth + padding * 2;
  const rectHeight = 30;
  const cornerRadius = 5;

  // Draw background
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.moveTo(rectX + cornerRadius, rectY);
  ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
  ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius);
  ctx.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
  ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - cornerRadius, rectY + rectHeight);
  ctx.lineTo(rectX + cornerRadius, rectY + rectHeight);
  ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - cornerRadius);
  ctx.lineTo(rectX, rectY + cornerRadius);
  ctx.quadraticCurveTo(rectX, rectY, rectX + cornerRadius, rectY);
  ctx.closePath();
  ctx.fill();

  // If username contains "npc" (case-insensitive), use light green; else white
  let isNPC = false;
  const npcNames = ["nancy", "farmer"]; // add all NPC usernames here
  if (npcNames.includes(this.username.toLowerCase())) {
    isNPC = true;
  }
  ctx.fillStyle = isNPC ? "rgba(51, 230, 158, 1)" : "white";

  // Draw the text
  ctx.strokeText(this.username, textX, textY);
  ctx.fillText(this.username, textX, textY);
}
}