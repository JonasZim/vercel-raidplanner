import {
  AnObject,
  Attacc,
  Players,
  ToppingObject,
  PossibleParentObject,
  isPlayers,
  isEnemys,
  isAttacks,
} from "../src/types";

export const setParentsAndTargetsANew = (
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
