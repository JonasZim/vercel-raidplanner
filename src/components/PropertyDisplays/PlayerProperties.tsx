import React, { useContext } from "react";
import { Players, EnemyObject, AnObject, isPlayers } from "../../types";
import Toppings from "./Attachments/Toppings";
import Attacks from "./Attachments/Attacks";
import ChangePlayerIcons from "./ChangePlayerIcons";
import { StepContext } from "../App";

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

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    player[step].pos = {
      ...player[step].pos,
      [name]: parseInt(value, 10),
    };
    changingPlayer();
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    player[step].size = { ...player[step].size, [name]: parseInt(value, 10) };
    changingPlayer();
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    player[step].rotation = value;
    changingPlayer();
  };

  return (
    <div>
      <div className="input-number-row-2">
        <div className="input-number-con">
          <label className="input-label">Pos X:</label>
          <input
            className="input-number"
            type="number"
            name="x"
            step={5}
            value={player[step].pos.x}
            onChange={handlePositionChange}
          />
        </div>
        <div className="input-number-con">
          <label className="input-label">Pos Y:</label>
          <input
            className="input-number"
            type="number"
            name="y"
            step={5}
            value={player[step].pos.y}
            onChange={handlePositionChange}
          />
        </div>
      </div>
      <div className="input-number-row-2">
        <div className="input-number-con">
          <label className="input-label">Height:</label>
          <input
            className="input-number"
            type="number"
            name="y"
            step={10}
            value={player[step].size.y}
            onChange={handleSizeChange}
          />
        </div>
        <div className="input-number-con">
          <label className="input-label">Width:</label>
          <input
            className="input-number"
            type="number"
            name="x"
            step={10}
            value={player[step].size.x}
            onChange={handleSizeChange}
          />
        </div>
      </div>
      <div className="input-number-row-1">
        <div className="input-number-con">
          <label className="input-label">Rotation:</label>
          <input
            className="input-number single"
            type="number"
            step={15}
            value={player[step].rotation}
            onChange={handleRotationChange}
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
