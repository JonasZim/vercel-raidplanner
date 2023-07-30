import React, { useContext } from "react";
import { Players, EnemyObject, AnObject, isPlayers } from "../../types";
import Toppings from "./Attachments/Toppings";
import Attacks from "./Attachments/Attacks";
import ChangePlayerIcons from "./ChangePlayerIcons";
import { StepContext } from "../App";
import InputNumber from "../utilComponents/InputNumber";
import InputText from "../utilComponents/InputText";

//import "../../styling/property.css";

interface PProps {
  player: Players | EnemyObject;
  changingPlayer: Function;
  addElements: Function;
  allElements: AnObject[];
}

export default function ItemForm({
  player,
  changingPlayer,
  allElements,
  addElements,
}: PProps) {
  const step = useContext(StepContext);

  return (
    <div>
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
            defaultValue={player[step].size.y}
            onChange={(value: number) => {
              player[step].size = { ...player[step].size, y: value };
              changingPlayer();
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Width</label>
          <InputNumber
            width="120px"
            step={5}
            defaultValue={player[step].size.x}
            onChange={(value: number) => {
              player[step].size = { ...player[step].size, x: value };
              changingPlayer();
            }}
          />
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Pos X</label>
          <InputNumber
            width="120px"
            step={10}
            defaultValue={player[step].pos.x}
            onChange={(value: number) => {
              player[step].pos = { ...player[step].pos, x: value };
              changingPlayer();
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Pos Y</label>
          <InputNumber
            step={10}
            width="120px"
            defaultValue={player[step].pos.y}
            onChange={(value: number) => {
              player[step].pos = { ...player[step].pos, y: value };
              changingPlayer();
            }}
          />
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Rotation</label>
          <InputNumber
            width="250px"
            step={15}
            defaultValue={player[step].rotation}
            onChange={(value: number) => {
              player[step].rotation = value;
              changingPlayer();
            }}
          />
        </div>
      </div>
      <br />
      Add Attachment:
      <br />
      <Toppings
        object={player}
        changingPlayer={changingPlayer}
        addElements={addElements}
        allElements={allElements}
      />
      <Attacks
        object={player}
        changingPlayer={changingPlayer}
        addElements={addElements}
        allElements={allElements}
      />
      <br />
      {isPlayers(player) && (
        <ChangePlayerIcons player={player} changingPlayer={changingPlayer} />
      )}
    </div>
  );
}
