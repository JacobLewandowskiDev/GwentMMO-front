//Create new Sprite Class
export class Sprite {
    constructor({ image, position, frames = { max: 1 } }) {
      this.image = image;
      this.position = position;
      this.frames = { ...frames, val: 0, elapsed: 0 };
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      };
      this.moving = false;
    }

    draw(ctx) {
        ctx.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      );

      if (this.moving) {
        if (this.frames.max > 1) {
          this.frames.elapsed++;
        }

        if (this.frames.elapsed % 10 == 0) {
          if (this.frames.val < this.frames.max - 1) {
            this.frames.val++;
          } else {
            this.frames.val = 0;
          }
        }
      }
    }
  }