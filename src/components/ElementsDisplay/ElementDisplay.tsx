import styles from "./elementdisplay.module.css";

//import "../../styling/header.css";
import {
  AnObject,
  isEnemys,
  isPlayers,
  isToppings,
  isWaymarks,
} from "../../types";
import { isAttacks } from "../../types";
import { StepContext } from "../App";
import { useContext } from "react";
import DisplayType from "./ElementTypeDisplay";
import React from "react";

interface ElementDisplayProps {
  allElements: AnObject[];
  selectedElement: AnObject | null;
  setSelectedElement: Function;
  deleteElementEntirely: Function;
  deleteFromStep: Function;
}

export default function ElementDisplay({
  allElements,
  selectedElement,
  setSelectedElement,
  deleteElementEntirely,
  deleteFromStep,
}: ElementDisplayProps) {
  const currentStep = useContext(StepContext);

  const getElementsOnStep = (): AnObject[] => {
    return allElements.filter((element: AnObject) => {
      if (isWaymarks(element)) {
        return element;
      }
      return element[currentStep];
    });
  };

  const getElementsNotOnStep = (): AnObject[] => {
    return allElements.filter((element: AnObject) => {
      if (isWaymarks(element)) {
        return false;
      }
      return !element[currentStep];
    });
  };

  type Type =
    | "Enemies"
    | "Players"
    | "Attacks"
    | "Waymarks"
    | "Toppings"
    | "Other";

  const typeOrder: Type[] = [
    "Enemies",
    "Players",
    "Attacks",
    "Waymarks",
    "Toppings",
    "Other",
  ];

  function getSortIndexForType(obj: AnObject): number {
    if (isEnemys(obj)) {
      return 0;
    } else if (isPlayers(obj)) {
      return 1;
    } else if (isAttacks(obj)) {
      return 2;
    } else if (isWaymarks(obj)) {
      return 3;
    } else if (isToppings(obj)) {
      return 4;
    } else {
      return 5;
    }
  }
  function getTypeByIndex(index: number): Type {
    return typeOrder[index];
  }

  const getElementsByType = (arr: AnObject[]): AnObject[][] => {
    const typeArray: AnObject[][] = [];
    arr.forEach((element: AnObject) => {
      const index = getSortIndexForType(element);
      if (!typeArray[index]) {
        typeArray[index] = [];
      }
      typeArray[index].push(element);
    });
    return typeArray;
  };

  return (
    <div
      className={styles.elementdisplay}
      style={{ backgroundColor: "var(--darkest)", color: "var(--text-color)" }}
    >
      {getElementsByType(getElementsOnStep()).map(
        (typeArray: AnObject[], index: number) => {
          return (
            <DisplayType
              key={index}
              arr={typeArray}
              type={getTypeByIndex(index)}
              selected={selectedElement}
              setSelected={setSelectedElement}
              deleteElement={deleteElementEntirely}
              deleteFromStep={deleteFromStep}
            />
          );
        }
      )}
    </div>
  );
}
