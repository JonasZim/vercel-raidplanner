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
import InputNumber from "../utilComponents/InputNumber";

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
            defaultValue={topping[step].pos.x}
            onChange={(value: number) => {
              topping[step].pos = { ...topping[step].pos, x: value };
              changingTopping();
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Pos Y</label>
          <InputNumber
            step={10}
            width="120px"
            defaultValue={topping[step].pos.y}
            onChange={(value: number) => {
              topping[step].pos = { ...topping[step].pos, y: value };
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
