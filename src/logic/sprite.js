export class Sprite {
  constructor({ image, position, frames = { max: 1 }, username = ""}) {
    this.image = image;
    this.position = position;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.username = username;
    this.moving = false;

    // Ensure the image has loaded before drawing
    this.isLoaded = false;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      this.isLoaded = true; // Image loaded, set flag
    };
  }

  draw(ctx, offset = { x: 0, y: 0 }) {
    if (!this.isLoaded) return; // Prevent drawing before the image is loaded

    ctx.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.width,
      this.height,
      this.position.x + offset.x,  // 👈 apply offset
      this.position.y + offset.y,  // 👈 apply offset
      this.width,
      this.height
    );

    // Animate sprite if moving
    if (this.moving && this.frames.max > 1) {
      this.frames.elapsed++;
      if (this.frames.elapsed % 10 === 0) {
        this.frames.val = (this.frames.val + 1) % this.frames.max;
      }
    }

   
  }

  drawUsername(ctx) {
    if (this.username) {
      ctx.font = "400 1.3rem Bangers";
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      
      const textX = this.position.x + this.width / 2; // Center text above character
      const textY = this.position.y - 10; // Position the text above the sprite
  
      // Measure text width for background
      const textWidth = ctx.measureText(this.username).width;
      const padding = 5;
      const rectX = textX - textWidth / 2 - padding;
      const rectY = textY - 18 - padding;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = 30;
      const cornerRadius = 5; // Radius for rounded corners
  
      // Draw rounded rectangle as background
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
  
      // Draw username text
      ctx.strokeText(this.username, textX, textY);
      ctx.fillStyle = "White";
      ctx.fillText(this.username, textX, textY);
    }
  }
}