import { useState } from "react";
import { parseStyle } from "../Utils";

const Output = function ({
  onClick = function () {},
  onSetShapes = function () {},
}) {
  const defaultValue = {
    text: "",
    style: {},
    width: "100%",
    height: "100%",
  };
  const [data, setData] = useState(defaultValue);
  const outputStyle = function (text = "") {
    return `
        width: ${data.width},
        height: ${data.height},
        overflow: hidden;
        background-repeat: "no-repeat",
        position: "relative",${text}
        &:before {
            content: "";
            width: 100%;
            height: 100%;
            display: inline-block;
            position: relative;
            top: 0;
            left: -100%;
            background-image: linear-gradient(
              100deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0) 80%
            );
            animation: shine 1s infinite;
          }
    `;
  };
  return (
    <>
      <button
        onClick={() => {
          const data = onClick();
          console.log(data);
          setData(data);
        }}
      >
        输出
      </button>
      <button
        onClick={() => {
          setData(defaultValue);
        }}
      >
        清空
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
          width: 800,
          height: window.innerHeight,
          position: "relative",
          //   backgroundColor: "green",
        }}
      >
        <div
          className="output"
          style={{
            ...data.style,
            width: data.width,
            height: data.height,
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        ></div>
        <pre>
          <code>{data.text && outputStyle(data.text)}</code>
        </pre>
      </div>
    </>
  );
};

export default Output;
