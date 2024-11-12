let playerData = null;

// Player movement
let keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

let lastKey = "";
window.addEventListener("keydown", (e) => {
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
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "s":
    case "a":
    case "d":
      keys[e.key].pressed = false;
      if (playerData != null) {
        playerData.moving = false;
        playerData.frames.val = 0;
      }
      break;
  }
});

export function movePlayer(player, playerSprites, boundaries, ctx, vm) {
  playerData = player;
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
