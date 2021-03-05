class ShapeGroup {
  constructor({ group = [] }) {
    this.group = [...group];
  }
  updatePos(pos = { x: 0, y: 0 }) {}
}

export default ShapeGroup;
