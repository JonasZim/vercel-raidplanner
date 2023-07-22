import lc1 from "../icons/toppings/limitcut/lc1.png";
import lc2 from "../icons/toppings/limitcut/lc2.png";
import lc3 from "../icons/toppings/limitcut/lc3.png";
import lc4 from "../icons/toppings/limitcut/lc4.png";
import lc5 from "../icons/toppings/limitcut/lc5.png";
import lc6 from "../icons/toppings/limitcut/lc6.png";
import lc7 from "../icons/toppings/limitcut/lc7.png";
import lc8 from "../icons/toppings/limitcut/lc8.png";

import dsrX from "../icons/toppings/playstation/dsrX.png";
import dsrO from "../icons/toppings/playstation/dsrO.png";
import dsrSquare from "../icons/toppings/playstation/dsrSquare.png";
import dsrTriangle from "../icons/toppings/playstation/dsrTriangle.png";

import DragIcon from "../components/IconBar/DraggableIcon";
import { ObjectType, ToppingObject, PossibleParentObject } from "../types";
import React from "react";

const toppingStrings = {
  lc1: "/icons/toppings/limitcut/lc1.png",
  lc2: "/icons/toppings/limitcut/lc2.png",
  lc3: "/icons/toppings/limitcut/lc3.png",
  lc4: "/icons/toppings/limitcut/lc4.png",
  lc5: "/icons/toppings/limitcut/lc5.png",
  lc6: "/icons/toppings/limitcut/lc6.png",
  lc7: "/icons/toppings/limitcut/lc7.png",
  lc8: "/icons/toppings/limitcut/lc8.png",
  dsrX: "/icons/toppings/playstation/dsrX.png",
  dsrO: "/icons/toppings/playstation/dsrO.png",
  dsrSquare: "/icons/toppings/playstation/dsrSquare.png",
  dsrTriangle: "/icons/toppings/playstation/dsrTriangle.png",
};

const lc = {
  lc1: lc1,
  lc2: lc2,
  lc3: lc3,
  lc4: lc4,
  lc5: lc5,
  lc6: lc6,
  lc7: lc7,
  lc8: lc8,
};

const dsr = {
  dsrX: dsrX,
  dsrO: dsrO,
  dsrSquare: dsrSquare,
  dsrTriangle: dsrTriangle,
};

export type Lc = keyof typeof lc;
export type Dsr = keyof typeof dsr;

export const getAllLcIcons = () => {
  return {
    ...lc,
  };
};

export const getAllDsrIcons = () => {
  return {
    ...dsr,
  };
};

const getIconName = (key: Lc) => {
  return key;
};

const getLcIcon = (key: Lc) => {
  const allIcons = getAllLcIcons();
  return allIcons[key];
};

const getDSRIcon = (key: Dsr) => {
  const allIcons = getAllDsrIcons();
  return allIcons[key];
};

const getDraggableIcon = (key: Lc) => {
  return (
    <DragIcon
      key={key}
      type={ObjectType[key]}
      src={getLcIcon(key)}
      alt={getIconName(key)}
    />
  );
};

export const getDraggableLCIcons = (keys: Lc[]) => {
  return keys.map((key) => {
    return getDraggableIcon(key);
  });
};

export const getLcDragIcons = () => {
  return getDraggableLCIcons(Object.keys(lc) as Lc[]);
};

export const createLcObject = (
  key: Lc,
  step: number,
  id = 0,
  parents = new Array<PossibleParentObject>(),
  pos = { x: 250, y: 250 }
): ToppingObject => {
  const width = parseInt(key[2], 10) > 4 ? 64 : 32;
  return {
    id: id,
    label: key,
    size: { x: width, y: 32 },
    iconString: toppingStrings[key],
    type: ObjectType[key],
    offset: { x: 0, y: 32 },
    [step]: {
      pos: { x: pos.x + width / 2, y: pos.y + 32 / 2 },
      parents: parents,
    },
  };
};

export const createDsrObject = (
  key: Dsr,
  step: number,
  id = 0,
  parents = new Array<PossibleParentObject>(),
  pos = { x: 250, y: 250 }
): ToppingObject => {
  return {
    id: id,
    label: key,
    size: { x: 32, y: 32 },
    iconString: toppingStrings[key],
    type: ObjectType[key],
    offset: { x: 0, y: 32 },
    [step]: {
      pos: { x: pos.x + 32 / 2, y: pos.y + 32 / 2 },
      parents: parents,
    },
  };
};
