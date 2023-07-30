import styles from "./property.module.css";
import {
  isAttacks,
  isToppings,
  AnObject,
  isPlayers,
  isEnemys,
} from "../../types";
import { MapType, isMap } from "../Canvases/maptype";
import AttackProperties from "./Attacks/base";
import ToppingProperties from "./ToppingProperties";

import MapProperties from "./MapProperties/MapProperties";
import PlayerProperties from "./PlayerProperties";
import InputText from "../utilComponents/InputText";

import { StepContext } from "../App";
import React, { useContext } from "react";

interface PropertyDisplayProps {
  allElements: AnObject[];
  selectedElement: AnObject | MapType;
  updateSelected: Function;
  updateAllElements: Function;
  setArena: Function;
}

export default function PropertyDisplay({
  allElements,
  selectedElement,
  updateSelected,
  updateAllElements,
  setArena,
}: PropertyDisplayProps) {
  const step = useContext(StepContext);

  const display = () => {
    if (isMap(selectedElement)) {
      return <MapProperties arena={selectedElement} setArena={setArena} />;
    } else if (
      (isPlayers(selectedElement) || isEnemys(selectedElement)) &&
      selectedElement[step]
    ) {
      return (
        <PlayerProperties
          player={selectedElement}
          changingPlayer={updateSelected}
          addElements={updateAllElements}
          allElements={allElements}
        />
      );
    } else if (isAttacks(selectedElement) && selectedElement[step]) {
      return (
        <AttackProperties
          attack={selectedElement}
          changingAttack={updateSelected}
          allElements={allElements}
        />
      );
    } else if (isToppings(selectedElement) && selectedElement[step]) {
      return (
        <ToppingProperties
          topping={selectedElement}
          changingTopping={updateSelected}
          allElements={allElements}
        />
      );
    }
  };

  const makeLabel = () => {
    if (!isMap(selectedElement)) {
      return (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Name</label>
            <InputText
              width="120px"
              defaultValue={selectedElement.label}
              onChange={(value: string) => {
                selectedElement.label = value;
                updateSelected();
              }}
            />
          </div>
          <br />
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={styles.propertydisplay}
      style={{
        backgroundColor: "var(--darkest)",
        color: "var(--text-color)",
        padding: "5px",
      }}
    >
      {makeLabel()}
      {display()}
    </div>
  );
}
