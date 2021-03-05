import _ from "lodash";
import { useEffect, useRef } from "react";
import { drawSelectAreaLine } from "../Utils";
import Shapes from "./ShapeList";
import ShortKeys from "./ShortKeys";

function Playground({ shapes = new Shapes() }) {
  const canvasRef = useRef();
  let isShapeMoving = false;

  const _handleMouseMove = _.throttle(function (event) {
    const { x, y } = event.target.getBoundingClientRect();
    const { clientX, clientY } = event;
    const ctx = canvasRef.current.getContext("2d");
    const startPos = {
      x: clientX - x,
      y: clientY - y,
    };
    let activeShape = shapes.calculateActiveShape(ctx, startPos);
    if (isShapeMoving) {
      return;
    }
    if (activeShape.getActiveSide(startPos, 2)) {
      canvasRef.current.style.cursor =
        activeShape.resizeDirection.direction + "-resize";
    } else if (activeShape.isActive) {
      canvasRef.current.style.cursor = "move";
    } else {
      canvasRef.current.style.cursor = "default";
      event.preventDefault();
      event.stopPropagation();
    }
  }, 50);

  const _handleMouseDown = function (event) {
    event.preventDefault();
    event.stopPropagation();
    const { x, y } = event.target.getBoundingClientRect();
    const { clientX, clientY } = event;
    const ctx = canvasRef.current.getContext("2d");
    const startPos = {
      x: clientX - x,
      y: clientY - y,
    };
    let activeShape = shapes.getActiveShape();

    let minusX = 0;
    let minusY = 0;

    let isActive = activeShape.isActive;

    shapes.setOriginActiveShape();

    if (isActive) {
      minusX = clientX - activeShape.pos.x - x;
      minusY = clientY - activeShape.pos.y - y;
    }

    shapes.setSelectedShapes(event.metaKey);

    const _move = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const endPos = {
        x: e.clientX - x - minusX,
        y: e.clientY - y - minusY,
      };
      if (!isActive) {
        shapes.setDisableActiveShapes();
        shapes.render(ctx);
        drawSelectAreaLine(ctx, startPos, endPos);
        return;
      }
      isShapeMoving = true;

      if (activeShape.origin && activeShape.origin.getActiveSide(startPos, 2)) {
        activeShape.resize(endPos, activeShape.origin);
      } else {
        activeShape.updatePos(endPos);
      }
      shapes.render(ctx);
    };
    const _up = function (e) {
      const endPos = {
        x: e.clientX - x - minusX,
        y: e.clientY - y - minusY,
      };
      document.removeEventListener("mousemove", _move);
      document.removeEventListener("mouseup", _up);
      isShapeMoving = false;
      shapes.removeOriginActiveShape();
      shapes.setDisableActiveShapes(false);
      shapes.selectShapesOnActiveArea(startPos, endPos, !isActive);
      shapes.render(ctx);
      console.log(shapes.getSelectedShapes(), isActive);
    };
    document.addEventListener("mousemove", _move);
    document.addEventListener("mouseup", _up);
  };

  useEffect(() => {
    const $canvas = canvasRef.current;
    const ctx = $canvas.getContext("2d");
    shapes.render(ctx);
  });

  useEffect(() => {
    const $canvas = canvasRef.current;
    const ctx = $canvas.getContext("2d");
    let shortKeys = new ShortKeys({ ctx, shapes: shapes });
    shortKeys.setShortKeys();
    return shortKeys.removeShortKeys();
  });
  return (
    <canvas
      width={800}
      height={window.innerHeight}
      ref={canvasRef}
      style={{ width: 800, height: window.innerHeight }}
      onMouseMove={_handleMouseMove}
      onMouseDown={_handleMouseDown}
    />
  );
}

export default Playground;
