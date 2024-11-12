import collisions from "@/data/collisions";

    
    // Create subarrays for event tiles by slicing main array by num of columns in map (70)
    function createTileSubArrays(dataArray, newArray) {
        for (let i = 0; i < dataArray.length; i += 70) {
          newArray.push(dataArray.slice(i, 70 + i));
        }
    }
  
    // Create subarrays of collision tiles
    const collisionsMap = [];
    createTileSubArrays(collisions, collisionsMap);
  
    //Create new Boundary Class (Tile width & Height = 32px * 270%(Zoom in on map))
    export class Boundary {
        static eventTileWidth = 32 * 2.7;
        static eventTileHeight = 32 * 2.7;
        constructor({ position }) {
            this.position = position;
            this.width = Boundary.eventTileWidth;
            this.height = Boundary.eventTileHeight;
        }

        draw(ctx) {
            ctx.fillStyle = "rgba(255, 0, 0, 0)";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    const boundaries = [];

    export function createBoundry(offset) {
        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol == 2513) {
                boundaries.push(
                    new Boundary({
                    position: {
                        x: j * Boundary.eventTileHeight + offset.x,
                        y: i * Boundary.eventTileWidth + offset.y,
                    },
                    })
                );
                }
            });
        });
        return boundaries;
    }
    