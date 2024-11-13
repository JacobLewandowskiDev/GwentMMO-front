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

  draw(ctx) {
    if (!this.isLoaded) return; // Prevent drawing before the image is loaded

    ctx.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
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
    // Draw the username above the sprite
    if (this.username) {
      ctx.font = "400 1.3rem Bangers";
      ctx.lineWidth = .6;
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      const textX = this.position.x + this.width / 2; // Position Username center of character
      const textY = this.position.y - 10; // Position the text above the sprite
      ctx.strokeText(this.username, textX, textY);

      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Dark gray with 50% transparency
      const textWidth = ctx.measureText(this.username).width; // Get text width for background
      const padding = 5; // Padding around text
      ctx.fillRect(textX - textWidth / 2 - padding, textY - 18 - padding, textWidth + padding * 2, 30); // Draw rectangle as background

      ctx.fillStyle = "White";
      ctx.fillText(this.username, textX, textY);
    }
  }
}