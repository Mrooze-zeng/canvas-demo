import Base from "./Base";

class Square extends Base {
  constructor(props) {
    super(props);
    this.width = props.width;
    this.height = props.height;
  }
  resize(pos = {}) {
    if (!this.origin) {
      return;
    }
    const { l, t, r, b } = this.origin.resizeDirection;
    if (l) {
      this.updateSize({
        width: this.origin.width + (this.origin.pos.x - pos.x),
        height: this.origin.height,
      });
      this.updatePos({
        x: pos.x,
        y: this.origin.pos.y,
      });
    }
    if (t) {
      this.updateSize({
        width: this.origin.width,
        height: this.origin.height + (this.origin.pos.y - pos.y),
      });
      this.updatePos({
        x: this.origin.pos.x,
        y: pos.y,
      });
    }
    if (r) {
      this.updateSize({
        width: this.origin.width + (pos.x - this.origin.pos.x),
        height: this.origin.height,
      });
    }
    if (b) {
      this.updateSize({
        width: this.origin.width,
        height: this.origin.height + (pos.y - this.origin.pos.y),
      });
    }
  }
  updateSize({ width = 0, height = 0 } = {}) {
    this.width = width;
    this.height = height;
  }
  isCursorOnShape({ x = 0, y = 0 }) {
    return (
      !(x <= this.pos.x || x >= this.pos.x + this.width) &&
      !(y <= this.pos.y || y >= this.pos.y + this.height)
    );
  }
  isShapeOnArea(startPos = { x: 0, y: 0 }, endPos = { x: 0, y: 0 }) {
    return (
      !(
        Math.min(startPos.x, endPos.x) > this.pos.x + this.width ||
        Math.max(startPos.x, endPos.x) < this.pos.x
      ) &&
      !(
        Math.min(startPos.y, endPos.y) > this.pos.y + this.height ||
        Math.max(startPos.y, endPos.y) < this.pos.y
      )
    );
  }
  getActiveSide({ x = 0, y = 0 }, extra = 0) {
    this.resizeDirection.setLTRB({
      l: Math.abs(x - this.pos.x) < this.lineWidth + extra,
      r: Math.abs(x - this.pos.x - this.width) < this.lineWidth + extra,
      t: Math.abs(y - this.pos.y) < this.lineWidth + extra,
      b: Math.abs(y - this.pos.y - this.height) < this.lineWidth + extra,
    });
    return (
      Math.abs(x - this.pos.x) < this.lineWidth + extra ||
      Math.abs(x - this.pos.x - this.width) < this.lineWidth + extra ||
      Math.abs(y - this.pos.y) < this.lineWidth + extra ||
      Math.abs(y - this.pos.y - this.height) < this.lineWidth + extra
    );
  }
  _calculateBoundary(ctx) {
    let [direction, { x, y }] = super._calculateBoundary(ctx);
    const width = ctx.canvas.width,
      height = ctx.canvas.height;
    direction.setLTRB({
      l: this.pos.x <= 0,
      t: this.pos.y <= 0,
      r: this.pos.x + this.width >= width,
      b: this.pos.y + this.height >= height,
    });
    const { l, t, r, b } = direction;
    if (l) {
      x = 0;
    }
    if (t) {
      y = 0;
    }
    if (r) {
      x = ctx.canvas.width - this.width;
    }
    if (b) {
      y = ctx.canvas.height - this.height;
    }
    return [direction, { x, y }];
  }
  _calculateMaxAndMin(ctx) {
    if (!this.origin) {
      return;
    }
    const { l, t, r, b } = this.origin.resizeDirection;
    if (r && this.pos.x + this.width >= ctx.canvas.width) {
      this.width = ctx.canvas.width - this.pos.x;
    }
    if (b && this.pos.y + this.height >= ctx.canvas.height) {
      this.height = ctx.canvas.height - this.pos.y;
    }
    if (l && this.origin.pos.x + this.origin.width <= this.width) {
      this.width = this.origin.pos.x + this.origin.width;
      this.pos.x = 0;
    }
    if (t && this.origin.pos.y + this.origin.height <= this.height) {
      this.height = this.origin.pos.y + this.origin.height;
      this.pos.y = 0;
    }
    if (this.width <= 10) {
      this.width = 10;
    }
    if (this.height <= 10) {
      this.height = 10;
    }
  }
  getAnchorPoint() {
    this.anchor.setLTRB({
      lt: this.pos,
      rt: { x: this.pos.x + this.width, y: this.pos.y },
      rb: { x: this.pos.x + this.width, y: this.pos.y + this.height },
      lb: { x: this.pos.x, y: this.pos.y + this.height },
    });
    return this.anchor;
  }
  render(ctx = {}) {
    this._calculateMaxAndMin(ctx);
    this._setBoundary(ctx);
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.isSelected ? this.activeColor : this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  parseStyle() {
    return {
      backgroundImage: `linear-gradient( ${this.color} 100%, transparent 0 )`,
      backgroundPosition: `${this.pos.x}px ${this.pos.y}px`,
      backgroundSize: `${this.width}px ${this.height}px`,
    };
  }
  toJSON() {
    return {
      pos: this.pos,
      color: this.color,
      activeColor: this.activeColor,
      isActive: this.isActive,
      isSelected: this.isSelected,
      width: this.width,
      height: this.height,
    };
  }
}

export default Square;
