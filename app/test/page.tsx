import App from "../../src/components/App";
import { initSetupPlayer } from "../../src/utils/loadIcons";
import { initSetupBoss } from "../../src/utils/loadBoss";
import {
  isAttacks,
  isToppings,
  AnObject,
  Attacc,
  ToppingObject,
  Players,
  isEnemys,
  isPlayers,
  PossibleParentObject,
} from "../../src/types";
import React from "react";

function Flapp() {
  /*
  const planData = localStorage.getItem("plannerState");

  let initSteps = [0];
  let idStart = 9;
  let init: AnObject[];
  if (planData) {
    const allInfo = JSON.parse(planData);
    const initState = allInfo.allItems;
    initState.forEach((element: AnObject) => {
      if (isAttacks(element) || isToppings(element)) {
        setParentsAndTargetsANew(element, initState);
      }
    });
    initSteps = allInfo.steps;
    idStart = allInfo.idStart;
    init = initState;
  } else {
    */
  const initSteps = [0];
  const idStart = 9;
  const playerSetup2 = initSetupPlayer(0);
  const bossSetup2 = initSetupBoss(0);
  const init = [...playerSetup2, ...bossSetup2];
  //}

  const setParentsAndTargetsANew = (
    element: Attacc | ToppingObject,
    storageItems: AnObject[]
  ) => {
    Object.keys(element).forEach((key) => {
      const keyNum = parseInt(key);
      if (!isNaN(keyNum)) {
        if (element[keyNum].parents.length > 0) {
          element[keyNum].parents.forEach(
            (parent: PossibleParentObject, index: number) => {
              storageItems.forEach((item) => {
                if (isPlayers(item) || isEnemys(item)) {
                  if (item.id === parent.id) {
                    element[keyNum].parents[index] = item;
                  }
                }
              });
            }
          );
          if (isAttacks(element)) {
            if (element[keyNum].targets.length > 0) {
              element[keyNum].targets.forEach(
                (target: string | number | Players, index: number) => {
                  const isString = typeof target === "string";
                  const isNumber = typeof target === "number";
                  if (!isString && !isNumber) {
                    storageItems.forEach((item) => {
                      if (isPlayers(item)) {
                        if (item.id === target.id) {
                          element[keyNum].targets[index] = item;
                        }
                      }
                    });
                  }
                }
              );
            }
          }
        }
      }
    });
  };

  return (
    <div className="App">
      <App initItems={init} initSteps={initSteps} idStart={idStart} />
    </div>
  );
}

export default Flapp;
