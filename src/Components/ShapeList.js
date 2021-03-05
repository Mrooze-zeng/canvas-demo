import { drawGrid } from "../Utils";
import Anchor from "./Anchor";
import Base from "./Base";

class ShapeList {
  constructor(shapes = []) {
    this.shapes = shapes;
    this.activeShape = new Base();
    this.selectedShapes = [];
    this.isDisableActiveShapes = false;
  }
  setOriginActiveShape() {
    this.activeShape.setOrigin(true);
  }
  removeOriginActiveShape() {
    this.activeShape.setOrigin(false);
  }
  setDisableActiveShapes(bool = true) {
    this.isDisableActiveShapes = bool;
  }
  selectShapesOnActiveArea(
    startPos = { x: 0, y: 0 },
    endPos = { x: 0, y: 0 },
    isMultiple = false
  ) {
    isMultiple &&
      this.shapes.forEach((shape) => {
        shape.setSelected(shape.isShapeOnArea(startPos, endPos));
      });
    isMultiple && this.getSelectedShapes();
  }
  updatePos(minusX = 0, minusY = 0) {
    this.getSelectedShapes().forEach((shape) => {
      //todo multiple shape move
    });
  }
  updateShapes(newShapes = []) {
    this.shapes = newShapes;
  }
  calculateActiveShape(ctx = {}, { x = 0, y = 0 }) {
    const activeShapes = [];
    this.activeShape = new Base();
    if (!this.isDisableActiveShapes) {
      this.shapes.forEach((shape) => {
        shape.updateActiveStatus(false);
        if (shape.isCursorOnShape({ x, y })) {
          activeShapes.push(shape);
        }
      });
    }
    if (activeShapes.length) {
      let activeShape = activeShapes[activeShapes.length - 1];
      activeShape.updateActiveStatus(true);
      this.activeShape = activeShape;
    }
    return this.activeShape;
  }

  setActiveShape(shapeToActive) {
    this.resetShapeStatus();
    shapeToActive.updateActiveStatus(true);
    this.activeShape = shapeToActive;
  }

  resetShapeStatus() {
    this.shapes.forEach((shape) => {
      shape.updateActiveStatus(false);
    });
  }

  getActiveShape() {
    return this.activeShape;
  }
  hasActiveShape() {
    return this.activeShape.constructor.name !== "Base";
  }

  hasSelectedShape() {
    return this.getSelectedShapes().length > 0;
  }

  setSelectedShapes(isMultiple = false) {
    if (isMultiple) {
      this.activeShape.toggleSelected();
    } else {
      this.resetSelectedShapes();
      this.activeShape.setSelected();
    }
    this.selectedShapes = this.getSelectedShapes();
  }
  getSelectedShapes() {
    this.selectedShapes = this.shapes.filter((shape) => shape.isSelected);
    return this.selectedShapes;
  }
  resetSelectedShapes() {
    this.shapes.forEach((shape) => {
      shape.setSelected(false);
    });
  }

  getSpaceTakenUp(shapes = []) {
    let x = [];
    let y = [];
    shapes.forEach((shape) => {
      const { lt, rt, lb } = shape.getAnchorPoint();
      x = x.concat([lt.x, rt.x]);
      y = y.concat([lt.y, lb.y]);
    });
    return {
      anchor: new Anchor({
        lt: { x: Math.min(...x), y: Math.min(...y) },
        rt: { x: Math.max(...x), y: Math.min(...y) },
        rb: { x: Math.max(...x), y: Math.max(...y) },
        lb: { x: Math.min(...x), y: Math.max(...y) },
      }),
      width: Math.max(...x) - Math.min(...x),
      height: Math.max(...y) - Math.min(...y),
    };
  }

  isGroupReachBoundary(group = [], maxWidth = 0, maxHeight = 0) {
    const { anchor } = this.getSpaceTakenUp(group);
    return (
      Math.min(anchor.lb.x, anchor.lt.x, anchor.rb.x, anchor.rt.x) < 0 ||
      Math.min(anchor.lb.y, anchor.lt.y, anchor.rb.y, anchor.rt.y) < 0 ||
      Math.max(anchor.lb.x, anchor.lt.x, anchor.rb.x, anchor.rt.x) > maxWidth ||
      Math.max(anchor.lb.y, anchor.lt.y, anchor.rb.y, anchor.rt.y) > maxHeight
    );
  }

  parseStyle() {
    let backgroundImage = [];
    let backgroundPosition = [];
    let backgroundSize = [];
    this.shapes.forEach((shape) => {
      const style = shape.parseStyle();
      backgroundImage.unshift(style.backgroundImage);
      backgroundPosition.unshift(style.backgroundPosition);
      backgroundSize.unshift(style.backgroundSize);
    });
    return {
      text: `
        background-image: ${backgroundImage.join(",")};
        background-position: ${backgroundPosition.join(",")};
        background-size: ${backgroundSize.join(",")};    
            `,
      style: {
        backgroundImage: backgroundImage.join(","),
        backgroundPosition: backgroundPosition.join(","),
        backgroundSize: backgroundSize.join(","),
      },
    };
  }
  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawGrid(ctx);
    this.shapes.forEach((shape) => {
      shape.render(ctx);
    });
  }
  copy(shapes = []) {
    this.resetSelectedShapes();
    this.shapes = this.shapes.concat(shapes);
  }
  delete(selectedShapes = [new Base()]) {
    this.shapes = this.shapes.filter((shape) => {
      return (
        selectedShapes.findIndex(
          (selectedShape) => selectedShape.id === shape.id
        ) < 0
      );
    });
  }
  add(shape = new Base()) {
    return this.shapes.unshift(shape);
  }
}

export default ShapeList;
