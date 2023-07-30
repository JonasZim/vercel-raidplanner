import { ConeObject } from "../../../types";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";
import InputNumber from "../../utilComponents/InputNumber";

interface Props {
  attack: ConeObject;
  changeAttack: Function;
}

export default function ConeAoeProperties({ attack, changeAttack }: Props) {
  const step = useContext(StepContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Angle</label>
          <InputNumber
            width="120px"
            step={5}
            defaultValue={attack.angle}
            onChange={(value: number) => {
              attack.angle = value;
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Rotation</label>
          <InputNumber
            width="120px"
            defaultValue={attack[step].rotation}
            onChange={(value: number) => {
              attack[step].rotation = value;
            }}
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <label>Radius</label>
        <InputNumber
          width="100%"
          defaultValue={attack.radius}
          onChange={(value: number) => {
            attack.radius = value;
          }}
        />
      </div>
    </>
  );
}
