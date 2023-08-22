import { Attacc } from "../../types";
//import "../../styling/property.css";
import React from "react";

interface Props {
  color: string;
  attack: Attacc;
  onChange: Function;
  colorToRgb: Function;
}

export default function ColorButtonPrefab(props: Props) {
  const changeColor = () => {
    props.attack.color = props.colorToRgb(props.color);
    props.onChange();
  };

  return (
    <div
      className="color-button-prefab"
      style={{ backgroundColor: props.color }}
      onClick={changeColor}
    >
      <svg
        width="35px"
        height="30px"
        role="img"
        viewBox="0 0 20 20"
        fill={props.color}
      />
    </div>
  );
}
