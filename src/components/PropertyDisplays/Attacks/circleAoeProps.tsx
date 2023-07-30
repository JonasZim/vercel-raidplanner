import { CircleObject } from "../../../types";
import React from "react";
import InputNumber from "../../utilComponents/InputNumber";

interface Props {
  attack: CircleObject;
  changeAttack: Function;
}

export default function CircleAoeProperties({ attack, changeAttack }: Props) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <label>Radius</label>
        <InputNumber
          width="100%"
          step={10}
          defaultValue={attack.radius}
          onChange={(value: number) => {
            attack.radius = value;
            changeAttack();
          }}
        />
      </div>
    </>
  );
}
