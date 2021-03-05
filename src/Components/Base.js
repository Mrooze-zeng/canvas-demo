import { cloneShapeTypeFactory, generateId } from "../Utils";
import { Anchor, Direction } from "./";

class Base {
  constructor({
    color = "lightgray",
    activeColor = "rgb(89 199 249)",
    pos = { x: 0, y: 0 },
    isActive = false,
    isSelected = false,
  } = {}) {
    this.id = generateId();
    this.pos = pos;
    this.color = color;
    this.activeColor = activeColor;
    this.isActive = isActive;
    this.isSelected = isSelected;
    this.resizeDirection = new Direction();
    this.anchor = new Anchor();
    this.lineWidth = 2;
    this.origin = null;
  }
  setOrigin(isInitial = true) {
    this.origin = null;
    if (isInitial) {
      this.origin = cloneShapeTypeFactory(this);
    }
  }
  setActive(active = true) {
    this.isActive = active;
  }
  setSelected(selected = true) {
    this.isSelected = selected;
  }
  toggleSelected() {
    this.isSelected = !this.isSelected;
    this.updateActiveStatus(this.isSelected);
    console.log(this.isActive, this.isSelected);
  }
  movePos(minusX = 0, minusY = 0) {
    this.updatePos({
      x: this.pos.x - minusX,
      y: this.pos.y - minusY,
    });
  }
  updatePos(pos = { x: 0, y: 0 }) {
    this.pos = pos;
  }
  updateActiveStatus(status = false) {
    this.isActive = status;
  }
  updateSize() {}
  resize() {}
  isCursorOnShape() {}
  isShapeOnArea() {}
  getActiveSide() {}
  _calculateBoundary(ctx) {
    let x = this.pos.x;
    let y = this.pos.y;
    return [new Direction(), { x, y }];
  }
  _setBoundary(ctx) {
    const [{ l, t, r, b }, pos] = this._calculateBoundary(ctx);
    if (l || t || r || b) {
      this.updatePos(pos);
    }
  }
  getAnchorPoint() {}
  render() {}
  parseStyle() {
    return ``;
  }
  toJSON() {
    return {};
  }
}

export default Base;
