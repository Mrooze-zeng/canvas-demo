/* eslint-disable no-unused-vars */
import { Circle, ShapeList, Square } from "../Components";

const TypeMap = new Map([
  ["linear-gradient", Square],
  ["radial-gradient", Circle],
]);

function parseStyle(styleText = "") {
  const backgroundImageReg = new RegExp(
    /background-image:\s?([0-9a-z\-\s#(),%]*);/gi
  );
  const backgroundSizeReg = new RegExp(/background-size:\s?([0-9a-z\s,%]*);/gi);
  const backgroundPositionReg = new RegExp(
    /background-position:\s?([0-9a-z\s,%]*);/gi
  );
  const backgroundImageItemReg = new RegExp(
    /(linear|radial)-gradient\(([\s0-9a-z%,#]*)\){1}/gi
  );
  const circleReg = new RegExp(/radial-gradient\(([\s0-9a-z%,#]*)\){1}/gi);
  const circleColorReg = new RegExp(/,\s?[0-9a-z#]*\s\d/gi); //取第一个
  const circleRadiusReg = new RegExp(/circle\s([0-9a-z]*)\sat/gi);
  const squareReg = new RegExp(/linear-gradient\(([\s0-9a-z%,#]*)\){1}/gi);
  const squareColorReg = new RegExp(/inear-gradient\(\s?([0-9a-z#]*)\s\d/gi);

  let [backgroundImageStyle = "", backgroundImage = ""] =
    backgroundImageReg.exec(styleText) || [];
  let [backgroundSizeStyle = "", backgroundSize = ""] =
    backgroundSizeReg.exec(styleText) || [];
  let [backgroundPositionStyle = "", backgroundPosition = ""] =
    backgroundPositionReg.exec(styleText) || [];
  let backgroundImageItem = backgroundImage.match(backgroundImageItemReg) || [];

  const shapes = new ShapeList();

  backgroundPosition = backgroundPosition.replace(/[^\d^\s,]/g, "").split(",");
  backgroundSize = backgroundSize.replace(/[^\d^\s,]/g, "").split(",");
  backgroundImageItem.forEach((item, index) => {
    let shape;
    if (item.match(circleReg)) {
      let [color = ""] = item.match(circleColorReg) || [];
      let [radius] = item.match(circleRadiusReg) || [];
      let [x, y] = backgroundPosition[index].trim().split(/\s/);
      radius = Number(radius.replace(/[^\d]/g, ""));
      shape = new Circle({
        color: color.replace(/,|\d|\s/g, ""),
        pos: {
          x: Number(x) + radius,
          y: Number(y) + radius,
        },
        radius: radius,
      });
    }
    if (item.match(squareReg)) {
      let [color = ""] = item.match(squareColorReg) || [];
      let [x, y] = backgroundPosition[index].trim().split(/\s/);
      let [width, height] = backgroundSize[index].trim().split(/\s/);
      shape = new Square({
        color: color.replace(/,|\d|\s|inear-gradient\(/g, ""),
        pos: {
          x: Number(x),
          y: Number(y),
        },
        width: Number(width),
        height: Number(height),
      });
      console.log(shape);
    }
    shapes.add(shape);
  });
  return shapes;
}

export default parseStyle;
