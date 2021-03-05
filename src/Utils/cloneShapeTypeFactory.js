import _ from "lodash";
import { Base, Circle, Square } from "../Components";

function cloneShapeTypeFactory(source) {
  const ShapesMap = new Map([
    [Circle.name, Circle],
    [Square.name, Square],
    [Base.name, Base],
  ]);
  let ShapeClass = ShapesMap.get(source.constructor.name);
  let params = _.cloneDeep(source.toJSON());
  return new ShapeClass(params);
}

export default cloneShapeTypeFactory;
