import { ConeObject } from "../../../types";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";
import styles from "./attack.module.css";

interface Props {
  attack: ConeObject;
  changeAttack: Function;
}

export default function ConeAoeProperties({ attack, changeAttack }: Props) {
  const step = useContext(StepContext);

  return (
    <>
      <div className="input-number-row-2">
        <div className="input-number-con">
          <label className="input-label">Angle:</label>
          <input
            className="input-number"
            type="number"
            step={5}
            value={attack.angle}
            onChange={(e) => {
              attack.angle = parseInt(e.target.value);
              changeAttack();
            }}
          />
        </div>
        <div className="input-number-con">
          <label className="input-label">Radius:</label>
          <input
            className="input-number"
            type="number"
            step={10}
            value={attack.radius}
            onChange={(e) => {
              attack.radius = parseInt(e.target.value);
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
    </>
  );
}
