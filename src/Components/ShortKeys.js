import _ from "lodash";
import { cloneShapeTypeFactory } from "../Utils";
import Shapes from "./ShapeList";

class ShortKeys {
  constructor({ ctx, shapes = new Shapes() }) {
    this.ctx = ctx;
    this.shapes = shapes;
    this.copiedShape = null;
  }
  _handleKeyDown(event) {
    if (this[event.code] && event.metaKey) {
      const handler = _.throttle(this[event.code].bind(this), 50);
      handler(event);
      this.shapes.render(this.ctx);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  setShortKeys() {
    window.addEventListener("keydown", this._handleKeyDown.bind(this), false);
  }
  removeShortKeys() {
    window.removeEventListener(
      "keydown",
      this._handleKeyDown.bind(this),
      false
    );
    this.copiedShapes = [];
  }
  _isReachBoundary() {
    return this.shapes.isGroupReachBoundary(
      this.shapes.getSelectedShapes(),
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }
  Backspace(event) {
    this.shapes.hasSelectedShape() &&
      this.shapes.delete(this.shapes.getSelectedShapes());
  }
  KeyC(event) {
    if (this.shapes.hasSelectedShape()) {
      this.copiedShapes = this.shapes.getSelectedShapes();
    }
  }
  KeyV(event) {
    if (this.copiedShapes.length) {
      const shapes = [];
      this.copiedShapes.forEach((copiedShape) => {
        const shape = cloneShapeTypeFactory(copiedShape);
        shape.pos.x += 10;
        shape.pos.y += 10;
        shapes.push(shape);
      });
      this.shapes.copy(shapes);
      this.copiedShapes = shapes;
    }
  }
  ArrowUp(event) {
    !this._isReachBoundary() &&
      this.shapes.getSelectedShapes().forEach((shape) => {
        shape.pos.y -= 1;
      });
  }
  ArrowRight(event) {
    !this._isReachBoundary() &&
      this.shapes.getSelectedShapes().forEach((shape) => {
        shape.pos.x += 1;
      });
  }
  ArrowDown(event) {
    !this._isReachBoundary() &&
      this.shapes.getSelectedShapes().forEach((shape) => {
        shape.pos.y += 1;
      });
  }
  ArrowLeft(event) {
    !this._isReachBoundary() &&
      this.shapes.getSelectedShapes().forEach((shape) => {
        shape.pos.x -= 1;
        if (shape.pos.x === 0) {
          return;
        }
      });
  }
}

export default ShortKeys;
