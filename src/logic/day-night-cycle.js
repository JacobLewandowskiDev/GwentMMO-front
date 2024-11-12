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

// Check user's time of day and adjust day/night cycle
export function dayNightCycle(playerOffset, ctx, offset, map) {
  const adjustedCircleXY = circleXY.map(({ x, y }) => ({
    x: x - playerOffset.x,
    y: y,
  }));

  const date = new Date();
  const timeOfDay = date.getHours();
  const isDaytime = timeOfDay >= 7 && timeOfDay < 19;

  if (isDaytime) {
    ctx.fillStyle = "rgba(12, 20, 124, 0)";
  } else {
    ctx.fillStyle = "rgba(12, 20, 124, 0.5)";
    ctx.fillRect(offset.x, offset.y, map.width, map.height);
    lights(candleLight_2.radius, candleLight_2.fillStyle, adjustedCircleXY, ctx);
    lights(candleLight_1.radius, candleLight_1.fillStyle, adjustedCircleXY, ctx);
  }
}