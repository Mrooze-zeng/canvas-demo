import { useState } from "react";
import "./App.scss";
import { Output, Playground } from "./Components";
import demoShapes from "./mocks/shapes";

function App() {
  const [shapes, setShapes] = useState(demoShapes);
  const _handleClick = function () {
    return shapes.parseStyle(true);
  };

  const _handleSetShapes = function (_shapes) {
    setShapes(_shapes);
  };

  return (
    <div style={{ display: "flex" }}>
      <Playground shapes={shapes} />
      <Output onClick={_handleClick} onSetShapes={_handleSetShapes} />
    </div>
  );
}

export default App;
