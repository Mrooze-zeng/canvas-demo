function drawGrid(
  ctx,
  stepX = 10,
  stepY = 10,
  color = "lightgray",
  lineWidth = 0.5
) {
  ctx.lineWidth = lineWidth;

  for (let i = lineWidth, j = 0; i < ctx.canvas.width; i += stepX, j++) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    if (j % 5 === 0) {
      ctx.strokeStyle = "darkgrey";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.stroke();
  }

  for (let i = lineWidth, j = 0; i < ctx.canvas.height; i += stepY, j++) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
    if (j % 5 === 0) {
      ctx.strokeStyle = "darkgrey";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.stroke();
  }
}

export default drawGrid;
