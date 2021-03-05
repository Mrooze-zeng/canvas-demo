function drawSelectAreaLine(ctx, start = { x: 0, y: 0 }, end = { x: 0, y: 0 }) {
  ctx.beginPath();
  ctx.strokeStyle = "#59c7f9";
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineTo(start.x, end.y);
  ctx.closePath();
  ctx.stroke();
}

export default drawSelectAreaLine;
