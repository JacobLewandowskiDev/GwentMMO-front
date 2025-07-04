// Candlelight locations for in-game night time
// Brighter light 
const candleLight_1 = {
  radius: 10,
  fillStyle: "rgba(238,153,17, 0.4)",
};

// Dimmer light
const candleLight_2 = {
  radius: 50,
  fillStyle: "rgba(238,153,17, 0.2)",
};

// Coordinates for candlelight placement
const circleXY = [
  { x: -405, y: -395 },
  { x: 200, y: -395 },
  { x: 1238, y: -395 },
  { x: 1238, y: -1000 },
  { x: 808, y: -1000 },
  { x: 720, y: -1000 },
  { x: 2830, y: -1000 },
  { x: 200, y: -1000 },
  { x: 290, y: -1000 },
];

// Draw lights for candles
function lights(radius, fillStyle, circleXY, ctx) {
  ctx.beginPath();
  circleXY.forEach(({ x, y }) => {
    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
  });
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.strokeStyle = fillStyle;
  ctx.stroke();
}

// Simulated in-game clock configuration
const MINUTES_PER_REAL_SECOND = 3; // 1 real second = 3 in-game minutes
const MINUTES_IN_A_DAY = 1440;

// Store when the game started (or fetch this from the server if needed)
const GAME_START_REAL_TIME = Date.now() - (720 / MINUTES_PER_REAL_SECOND) * 1000; // This will be shared across tabs

// Convert real elapsed time into in-game time
function getSimulatedTime() {
  const now = Date.now();
  const elapsedRealSeconds = (now - GAME_START_REAL_TIME) / 1000;
  const simulatedMinutes = (elapsedRealSeconds * MINUTES_PER_REAL_SECOND) % MINUTES_IN_A_DAY;
  return simulatedMinutes;
}

// Calculates sky opacity based on in-game time
function getSkyOpacity(minutes) {
  const hour = Math.floor(minutes / 60);
  const min = minutes % 60;
  const time = hour + min / 60;

  if (time >= 7 && time < 18) return 0; // Day
  if (time >= 18 && time < 20) return (time - 18) / 2 * 0.5; // Sunset
  if (time >= 20 || time < 5) return 0.5; // Night
  if (time >= 5 && time < 7) return ((7 - time) / 2) * 0.5; // Sunrise
  return 0;
}

// Main day-night rendering logic
export function dayNightCycle(playerOffset, ctx, offset, map) {
  const adjustedCircleXY = circleXY.map(({ x, y }) => ({
    x: x - playerOffset.x,
    y: y,
  }));

  const simulatedTime = getSimulatedTime();

  // Optional debug log:
  const hour = Math.floor(simulatedTime / 60);
  const minute = Math.floor(simulatedTime % 60);
  console.log(`In-game time: ${hour}:${minute < 10 ? '0' + minute : minute}`);

  const skyOpacity = getSkyOpacity(simulatedTime);
  if (skyOpacity > 0) {
    ctx.fillStyle = `rgba(12, 20, 124, ${skyOpacity})`;
    ctx.fillRect(offset.x, offset.y, map.width, map.height);

    if (skyOpacity >= 0.3) {
      lights(candleLight_2.radius, candleLight_2.fillStyle, adjustedCircleXY, ctx);
      lights(candleLight_1.radius, candleLight_1.fillStyle, adjustedCircleXY, ctx);
    }
  }
}