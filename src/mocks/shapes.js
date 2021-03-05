import { Circle, ShapeList, Square } from "../Components";

export default new ShapeList([
  new Circle({
    pos: { x: 100, y: 100 },
    radius: 50,
    color: "red",
  }),
  new Circle({
    pos: { x: 300, y: 100 },
    radius: 50,
    color: "blue",
  }),
  new Square({
    pos: { x: 200, y: 200 },
    width: 100,
    height: 100,
    color: "green",
  }),
]);
