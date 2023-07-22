import { CircleObject } from "../../../types";
import React from "react";
import styles from "./attack.module.css";

interface Props {
  attack: CircleObject;
  changeAttack: Function;
}

export default function CircleAoeProperties({ attack, changeAttack }: Props) {
  return (
    <>
      <div className="input-number-row-1">
        <div className="input-number-con">
          <label className="input-label">Radius:</label>
          <input
            className="input-number single"
            step="15"
            type="number"
            value={attack.radius}
            onChange={(e) => {
              attack.radius = parseInt(e.target.value);
              changeAttack();
            }}
          />
        </div>
      </div>
    </>
  );
}
