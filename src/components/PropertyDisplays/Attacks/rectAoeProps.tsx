import { RectangleObject } from "../../../types";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";

//import "../../../styling/property.css";
import styles from "./attack.module.css";

interface Props {
  attack: RectangleObject;
  changeAttack: Function;
}

export default function RectAoeProperties({ attack, changeAttack }: Props) {
  const step = useContext(StepContext);

  return (
    <>
      <div className="input-number-row-2">
        <div className="input-number-con">
          <label className="input-label">Height:</label>
          <input
            className="input-number"
            type="number"
            value={attack.size.y}
            onChange={(e) => {
              attack.size.y = parseInt(e.target.value);
              changeAttack();
            }}
          />
        </div>
        <div className="input-number-con">
          <label className="input-label">Width:</label>
          <input
            className="input-number"
            type="number"
            value={attack.size.x}
            onChange={(e) => {
              attack.size.x = parseInt(e.target.value);
              changeAttack();
            }}
          />
        </div>
      </div>
      <br />
      <div className="input-number-row-1">
        <div className="input-number-con">
          <label className="input-label">Rotation:</label>
          <input
            className="input-number single"
            step="15"
            type="number"
            value={attack[step].rotation}
            onChange={(e) => {
              attack[step].rotation = parseInt(e.target.value, 10);
              changeAttack();
            }}
          />
        </div>
      </div>
      <br />
      RotPointInMiddle:{" "}
      <input
        type="checkbox"
        checked={attack.rotAt === "middle"}
        onChange={(e) => {
          attack.rotAt = e.target.checked ? "middle" : "bottom";
          if (attack.rotAt === "middle") {
            attack[step].pos.y = attack[step].pos.y + attack.size.y / 2;
          } else {
            attack[step].pos.y = attack[step].pos.y + attack.size.y / 2;
          }
          changeAttack();
        }}
      />
    </>
  );
}
