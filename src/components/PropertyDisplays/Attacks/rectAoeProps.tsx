import { RectangleObject } from "../../../types";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";
import InputNumber from "../../utilComponents/InputNumber";

interface Props {
  attack: RectangleObject;
  changeAttack: Function;
}

export default function RectAoeProperties({ attack, changeAttack }: Props) {
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
          <label>Height</label>
          <InputNumber
            step={5}
            width="120px"
            defaultValue={attack.size.y}
            onChange={(value: number) => {
              attack.size = { ...attack.size, y: value };
              changeAttack();
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Width</label>
          <InputNumber
            width="120px"
            step={5}
            defaultValue={attack.size.x}
            onChange={(value: number) => {
              attack.size = { ...attack.size, x: value };
              changeAttack();
            }}
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <label>Rotation</label>
        <InputNumber
          width="100%"
          step={5}
          defaultValue={attack[step].rotation}
          onChange={(value: number) => {
            attack[step].rotation = value;
            changeAttack();
          }}
        />
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
