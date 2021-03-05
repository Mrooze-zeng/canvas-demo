import { useState } from "react";
import "./App.scss";
import { Playground } from "./Components";
import demoShapes from "./mocks/shapes";
import { parseStyle } from "./Utils";

function App() {
  const [shapes, setShapes] = useState(demoShapes);
  const _handleClick = function () {
    return shapes.parseStyle();
  };

  const _handleSetShapes = function (_shapes) {
    setShapes(_shapes);
  };

  return (
    <div style={{ display: "flex" }}>
      <Playground shapes={shapes} />
      <Demo onClick={_handleClick} onSetShapes={_handleSetShapes} />
    </div>
  );
}

const Demo = function ({
  onClick = function () {},
  onSetShapes = function () {},
}) {
  const [text, setText] = useState("");
  const [style, setStyle] = useState({});
  return (
    <>
      <button
        onClick={() => {
          const { text, style } = onClick();
          setText(text);
          setStyle(style);
        }}
      >
        输出
      </button>
      <button
        onClick={() => {
          let code = window.prompt("请填入样式代码") || "";
          code = code.replace(/\r|\n|\s{2}/g, "");
          if (code) {
            onSetShapes(parseStyle(code));
          }
        }}
      >
        导入
      </button>
      <div
        style={{
          ...style,
          width: 800,
          height: window.innerHeight,
          backgroundColor: "green",
          backgroundRepeat: "no-repeat",
        }}
      >
        <pre>
          <code>{text}</code>
        </pre>
      </div>
    </>
  );
};

export default App;
