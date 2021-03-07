import Base from "./Base";

class Circle extends Base {
  constructor(props) {
    super(props);
    this.radius = props.radius;
  }
  resize(pos = {}) {
    if (!this.origin) {
      return;
    }
    const { l, t, r, b } = this.origin.resizeDirection;
    if (l) {
      this.updateSize({
        radius: this.origin.radius + (this.origin.pos.x - pos.x),
      });
    }
    if (t) {
      this.updateSize({
        radius: this.origin.radius + (this.origin.pos.y - pos.y),
      });
    }
    if (r) {
      this.updateSize({
        radius: this.origin.radius + (pos.x - this.origin.pos.x),
      });
    }
    if (b) {
      this.updateSize({
        radius: this.origin.radius + (pos.y - this.origin.pos.y),
      });
    }
  }
  updatePos(pos) {
    if (pos.x - this.radius <= 0) {
      this.pos.x = this.radius;
      return;
    }
    if (pos.y - this.radius <= 0) {
      this.pos.y = this.radius;
      return;
    }
    super.updatePos(pos);
  }
  updateSize({ radius = 0 } = {}) {
    this.radius = radius;
  }
  isCursorOnShape({ x = 0, y = 0 }) {
    return (
      !(x <= this.pos.x - this.radius || x >= this.pos.x + this.radius) &&
      !(y <= this.pos.y - this.radius || y >= this.pos.y + this.radius)
    );
  }
  isShapeOnArea(startPos = { x: 0, y: 0 }, endPos = { x: 0, y: 0 }) {
    return (
      !(
        Math.min(startPos.x, endPos.x) > this.pos.x + this.radius ||
        Math.max(startPos.x, endPos.x) < this.pos.x
      ) &&
      !(
        Math.min(startPos.y, endPos.y) > this.pos.y + this.radius ||
        Math.max(startPos.y, endPos.y) < this.pos.y
      )
    );
  }
  getActiveSide({ x = 0, y = 0 }, extra = 0) {
    this.resizeDirection.setLTRB({
      l: Math.abs(x - this.pos.x + this.radius) < this.lineWidth + extra,
      r: Math.abs(x - this.pos.x - this.radius) < this.lineWidth + extra,
      t: Math.abs(y - this.pos.y + this.radius) < this.lineWidth + extra,
      b: Math.abs(y - this.pos.y - this.radius) < this.lineWidth + extra,
    });
    return (
      Math.abs(x - this.pos.x - this.radius) < this.lineWidth + extra ||
      Math.abs(x - this.pos.x + this.radius) < this.lineWidth + extra ||
      Math.abs(y - this.pos.y - this.radius) < this.lineWidth + extra ||
      Math.abs(y - this.pos.y + this.radius) < this.lineWidth + extra
    );
  }
  _calculateBoundary(ctx) {
    let [direction, { x, y }] = super._calculateBoundary(ctx);
    const width = ctx.canvas.width,
      height = ctx.canvas.height;
    direction.setLTRB({
      l: this.pos.x - this.radius <= 0,
      t: this.pos.y - this.radius <= 0,
      r: this.pos.x + this.radius >= width,
      b: this.pos.y + this.radius >= height,
    });
    const { l, t, r, b } = direction;
    if (l) {
      x = this.radius;
    }
    if (t) {
      y = this.radius;
    }
    if (r) {
      x = ctx.canvas.width - this.radius;
    }
    if (b) {
      y = ctx.canvas.height - this.radius;
    }
    return [direction, { x, y }];
  }
  _calculateMaxAndMin(ctx) {
    if (!this.origin) {
      return;
    }
    if (this.pos.x - this.radius <= 0) {
      this.radius = this.pos.x;
    }
    if (this.pos.y - this.radius <= 0) {
      this.radius = this.pos.y;
    }

    if (
      this.radius * 2 >= ctx.canvas.width ||
      this.radius * 2 >= ctx.canvas.height
    ) {
      this.radius = ctx.canvas.width / 2;
    }
    if (this.radius <= 10) {
      this.radius = 10;
    }
  }
  getAnchorPoint() {
    this.anchor.setLTRB({
      lt: { x: this.pos.x - this.radius, y: this.pos.y - this.radius },
      rt: { x: this.pos.x + this.radius, y: this.pos.y - this.radius },
      rb: { x: this.pos.x + this.radius, y: this.pos.y + this.radius },
      lb: { x: this.pos.x - this.radius, y: this.pos.y + this.radius },
    });
    return this.anchor;
  }
  render(ctx = {}) {
    this._calculateMaxAndMin(ctx);
    this._setBoundary(ctx);
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    if (this.isSelected) {
      ctx.save();
      ctx.strokeStyle = this.activeColor;
      ctx.beginPath();
      ctx.rect(
        this.pos.x - this.radius,
        this.pos.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
  parseStyle({ x = 0, y = 0 } = {}) {
    return {
      backgroundImage: `radial-gradient( circle ${this.radius}px at ${this.radius}px ${this.radius}px, ${this.color} 100%, transparent 0 )`,
      backgroundPosition: `${this.pos.x - this.radius - x}px ${
        this.pos.y - this.radius - y
      }px`,
      backgroundSize: `${this.radius * 2}px ${this.radius * 2}px`,
    };
  }
  toJSON() {
    return {
      pos: this.pos,
      color: this.color,
      activeColor: this.activeColor,
      isActive: this.isActive,
      isSelected: this.isSelected,
      radius: this.radius,
    };
  }
}

export default Circle;
