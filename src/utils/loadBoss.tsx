import Boss from "../icons/enemy/herbert.png";

import DragIcon from "../components/IconBar/DraggableIcon";
import { ObjectType, EnemyObject } from "../types";
import React from "react";

const enemyStrings = {
  Boss: "/icons/enemy/herbert.png",
};

const closs = {
  Boss,
};

type bossy = keyof typeof closs;

const getAllEnemyIcons = () => {
  return {
    ...closs,
  };
};

const getIconName = (key: bossy) => {
  return key;
};

const getIcon = (key: bossy) => {
  const allIcons = getAllEnemyIcons();
  return allIcons[key];
};

const getIconKeys = () => {
  return Object.keys(closs) as bossy[];
};

const getDraggableIcon = (key: bossy) => {
  return (
    <DragIcon
      key={key}
      type={ObjectType[key]}
      src={enemyStrings[key]}
      alt={getIconName(key)}
    />
  );
};

export const getEnemyDragIcons = () => {
  return getIconKeys().map((key) => {
    return getDraggableIcon(key);
  });
};

export const initSetupBoss = (step: number) => {
  const bossman = Object.keys(closs).map((key) => {
    const schmoss = createEnemy(step, key as bossy);
    schmoss[step].pos = { x: 0, y: -100 };
    schmoss.id = 8;

    return schmoss;
  });

  return bossman;
};

export const createEnemy = (
  step: number,
  key: bossy,
  id = 0,
  pos = { x: 250, y: 250 }
): EnemyObject => {
  return {
    id: id,
    label: key,
    iconString: enemyStrings[key],
    type: ObjectType.Boss,
    [step]: {
      size: { x: 100, y: 100 },
      pos: { x: pos.x + 100 / 2, y: pos.y + 100 / 2 },
      rotation: 0,
    },
  };
};
