//import "../../styling/header.css";
import styles from "./property.module.css";
import MapModel from "../../models/MapModel";
import {
  isAttacks,
  isToppings,
  AnObject,
  isPlayers,
  isEnemys,
} from "../../types";
import AttackProperties from "./Attacks/base";
import ToppingProperties from "./ToppingProperties";

import MapProperties from "./MapProperties";
import PlayerProperties from "./PlayerProperties";

import { StepContext } from "../App";
import React, { useContext } from "react";

interface PropertyDisplayProps {
  allElements: AnObject[];
  changeMap: Function;
  selectedElement: AnObject | MapModel;
  updateSelected: Function;
  updateAllElements: Function;
}

export default function PropertyDisplay({
  allElements,
  changeMap,
  selectedElement,
  updateSelected,
  updateAllElements,
}: PropertyDisplayProps) {
  const step = useContext(StepContext);

  const display = () => {
    if (selectedElement instanceof MapModel) {
      return <MapProperties map={selectedElement} changeMap={changeMap} />;
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
    if (!(selectedElement instanceof MapModel)) {
      return (
        <div className="input-number-row-1">
          <div className="input-number-con">
            <label className="input-label">Name:</label>
            <input
              className="input-text"
              style={{
                backgroundColor: "var(--dark)",
                color: "white",
                border: "white 1px solid",
                borderRadius: "2px",
                padding: "2px",
              }}
              step="15"
              type="text"
              value={selectedElement.label}
              onChange={(e) => {
                selectedElement.label = e.target.value;
                updateSelected();
              }}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={styles.propertydisplay}
      style={{ backgroundColor: "var(--darkest)" }}
    >
      PropertyDIsplay Right Side
      {makeLabel()}
      {display()}
    </div>
  );
}
