import {
  ToppingObject,
  PossibleParentObject,
  isPossibleParent,
  AnObject,
} from "../../types";
import Dropdown from "./YetAnotherDropdown";
import { valuesToInt } from "../../utils/utils";
import { StepContext } from "../App";
import React, { useContext } from "react";

interface Props {
  topping: ToppingObject;
  changingTopping: Function;
  allElements: AnObject[];
}

export default function AttackProperties({
  topping,
  changingTopping,
  allElements,
}: Props) {
  const step = useContext(StepContext);

  const getAllObjects = (): PossibleParentObject[] => {
    return allElements.filter((element) => {
      return isPossibleParent(element);
    }) as PossibleParentObject[];
  };

  const onNewTarget = (updatedValues: string[]) => {
    const parents = getAllObjects().filter((object) =>
      valuesToInt(updatedValues).includes(object.id)
    );
    topping[step].parents = parents;
    changingTopping();
  };

  return (
    <div>
      <div className="input-number-row-2">
        <div className="input-number-con">
          <label className="input-label">Pos X:</label>
          <input
            className="input-number"
            step="10"
            type="number"
            value={topping[step].pos.x}
            onChange={(e) => {
              topping[step].pos.x = parseInt(e.target.value, 10);
              changingTopping();
            }}
          />
        </div>
        <div className="input-number-con">
          <label className="input-label">Pos Y:</label>
          <input
            className="input-number"
            step="10"
            type="number"
            value={topping[step].pos.y}
            onChange={(e) => {
              topping[step].pos.y = parseInt(e.target.value, 10);
              changingTopping();
            }}
          />
        </div>
      </div>
      <br />

      <Dropdown
        objects={getAllObjects()}
        nonObject={topping}
        updateValues={onNewTarget}
      />
    </div>
  );
}
