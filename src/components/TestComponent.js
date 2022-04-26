import React, { useState } from "react";
import StretchSqueeze from "./StretchSqueezeUuh";

const TestComponent = () => {
  const [value, setValue] = useState("UdK RUNDGANG");
  const [fontSize, setFontsize] = useState(5);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(200);
  const [position, setPosition] = useState("left");
  const [visible, setVisible] = useState(true);

  const handleChangeValue = e => {
    let text = e.target.value;
    setValue(text);
  };

  return (
    <div>
      <div style={{ padding: "16px" }}>
        <label htmlFor="text">TEXT</label>
        <input
          id="text"
          value={value}
          onChange={handleChangeValue}
          autoComplete="off"
          autoCapitalize="on"
        />
        <label htmlFor="text">fontsize</label>
        <input
          id="fontsize"
          value={fontSize}
          type="number"
          onChange={e => {
            setFontsize(e.target.value);
          }}
        />
        <label htmlFor="divWidth">divWidth</label>
        <input
          id="divWidth"
          value={width}
          type="number"
          onChange={e => {
            setWidth(e.target.value);
          }}
        />
        <label htmlFor="divHeight">divHeight</label>
        <input
          id="divHeight"
          value={height}
          type="number"
          onChange={e => {
            setHeight(e.target.value);
          }}
        />
        <label htmlFor="isvisible">isvisible</label>
        <input
          id="isvisible"
          type="checkbox"
          checked={visible}
          onChange={e => {
            setVisible(Boolean(e.target.checked));
          }}
        />
        <label htmlFor="position">position</label>
        <select
          name="position"
          id="position-select"
          onChange={e => {
            setPosition(e.target.value);
          }}
        >
          <option value="left">left</option>
          <option value="top">top</option>
        </select>
      </div>
      <div
        style={{
          margin: "16px",
          width: `${width}px`,
          height: `${height}px`,
          display: position == "left" ? "flex" : "block",
          overflow: "hidden",
        }}
      >
        <StretchSqueeze
          text={value}
          position={position}
          fontSize={fontSize}
          visible={visible}
          width={width}
          height={height}
        ></StretchSqueeze>
        <StretchSqueeze
          text={value}
          position={position == "top" ? "bottom" : "right"}
          fontSize={fontSize}
          visible={!visible}
          width={width}
          height={height}
        ></StretchSqueeze>
      </div>
    </div>
  );
};

export default TestComponent;
