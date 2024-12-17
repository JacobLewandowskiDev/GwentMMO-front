import { Sprite } from "@/logic/sprite.js";

  // Create Player
  export function createPlayer(playerSprites, playerDrawingOffset, canvas, playerUsername) {
    const player = new Sprite({
      image: playerSprites.down,
      position: {
        x: canvas.width / 2 - playerSprites.down.width / 8 - playerDrawingOffset.x,
        y: canvas.height / 2 - playerSprites.down.height / 2 - playerDrawingOffset.y,
      },
      frames: { max: 4 },
      playerSprites: {
        up: playerSprites.up,
        down: playerSprites.down,
        left: playerSprites.left,
        right: playerSprites.right,
      },
      username: playerUsername
    });

    return player;
  }

let playerStatus = null;

// Player movement
let keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

let lastKey = "";
export function handleKeyDown(e) {
  // Keydown logic
  switch (e.key) {
    case "w":
      lastKey = "w";
      keys.w.pressed = true;
      break;
    case "s":
      lastKey = "s";
      keys.s.pressed = true;
      break;
    case "a":
      lastKey = "a";
      keys.a.pressed = true;
      break;
    case "d":
      lastKey = "d";
      keys.d.pressed = true;
      break;
  }
}

export function handleKeyUp(e) {
  // Keyup logic
  if (["w", "s", "a", "d"].includes(e.key)) {
    keys[e.key].pressed = false;
    if (playerStatus != null) {
      playerStatus.moving = false;
      playerStatus.frames.val = 0;
    }
  }
}

export function movePlayer(playerData, playerSocket, player, playerSprites, boundaries, ctx, vm) {
  playerStatus = player;
  let moving = true;
  if (keys.w.pressed && lastKey == "w") {
    player.image = playerSprites.up;
    changeSongs(player, vm);
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        playerCollision({
          player: player,
          boundary: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 4,
            },
          },
        })
      ) {
        moving = false;
        player.moving = false;
        player.frames.val = 0;
        break;
      }
    }
    if (moving == true) {
      player.position.y -= 4;
      ctx.translate(0, 4);
      player.moving = true;
      sendMovementUpdate(playerData, playerSocket, player.position.x, player.position.y);
    }
  }

  if (keys.s.pressed && lastKey == "s") {
    player.image = playerSprites.down;
    changeSongs(player, vm);
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        playerCollision({
          player: player,
          boundary: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 4,
            },
          },
        })
      ) {
        moving = false;
        player.moving = false;
        player.frames.val = 0;
        break;
      }
    }
    if (moving == true) {
      player.position.y += 4;
      ctx.translate(0, -4);
      player.moving = true;
      sendMovementUpdate(playerData, playerSocket, player.position.x, player.position.y);
    }
  }

  if (keys.a.pressed && lastKey == "a") {
    player.image = playerSprites.left;
    changeSongs(player, vm);
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        playerCollision({
          player: player,
          boundary: {
            ...boundary,
            position: {
              x: boundary.position.x + 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        player.moving = false;
        player.frames.val = 0;
        break;
      }
    }
    if (moving == true) {
      player.position.x -= 4;
      ctx.translate(4, 0);
      player.moving = true;
      sendMovementUpdate(playerData, playerSocket, player.position.x, player.position.y);
    }
  }

  if (keys.d.pressed && lastKey == "d") {
    player.image = playerSprites.right;
    changeSongs(player, vm);
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        playerCollision({
          player: player,
          boundary: {
            ...boundary,
            position: {
              x: boundary.position.x - 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        player.moving = false;
        player.frames.val = 0;
        break;
      }
    }
    if (moving == true) {
      player.position.x += 4;
      ctx.translate(-4, 0);
      player.moving = true;
      sendMovementUpdate(playerData, playerSocket, player.position.x, player.position.y);
    }
  }
}

function playerCollision({ player, boundary }) {
  return (
    player.position.x + player.width >= boundary.position.x &&
    player.position.x <= boundary.position.x + boundary.width &&
    player.position.y >= boundary.position.y - boundary.height &&
    player.position.y - player.width <= boundary.position.y
  );
}

let isPlayerInside = false;

// Change songs depending on the isPlayerInside variable
function changeSongs(player, vm) {
  const playerX = player.position.x;
  const playerY = player.position.y;

  // Determine if the player is inside or outside
  const insideBoundary = playerX < 800 && playerX > 440 && playerY < -330;
  const outsideBoundary = playerX < 800 && playerX > 440 && playerY > -130;

  if (insideBoundary && !isPlayerInside && vm.outdoorThemePlaying) {
    vm.outdoorThemeSong.pause();
    if (vm.isPlaying) {
      vm.indoorThemeSong.play();
    }
    vm.outdoorThemePlaying = false;
    isPlayerInside = true; // Update state to inside
  } else if (outsideBoundary && isPlayerInside && !vm.outdoorThemePlaying) {
    vm.indoorThemeSong.pause();
    if (vm.isPlaying) {
      vm.outdoorThemeSong.play();
    }
    vm.outdoorThemePlaying = true;
    isPlayerInside = false; // Update state to outside
  }
}


let lastUpdateTime = 0;

export function sendMovementUpdate(player, playerSocket, x, y,  interval = 500) {
  const now = Date.now();
  if (now - lastUpdateTime >= interval) {
    lastUpdateTime = now;

    if (player && playerSocket) {
      playerSocket.send("/app/player-move", {}, JSON.stringify({
        playerId: player.id,
        username: player.username,
        playerPositionX: x,
        playerPositionY: y,
      }));
    } else {
      console.error("Player or playerSocket is not initialized.");
    }
  }
}