import cone from "../icons/attacks/cone.png";
import rect from "../icons/attacks/rect.png";
import circle from "../icons/attacks/circle.png";

import React from "react";

import {
  ObjectType,
  ConeObject,
  RectangleObject,
  CircleObject,
  AttackObject,
  PossibleParentObject,
  Players,
  EnemyObject,
} from "../types";

import DragIcon from "../components/IconBar/DraggableIcon";

const attackStrings = {
  Cone: "/icons/attacks/cone.png",
  Rect: "/icons/attacks/rect.png",
  Circle: "/icons/attacks/circle.png",
};

const getIconName = (key: AttackShapes) => {
  return key;
};

export const getIcon = (key: AttackShapes) => {
  return attackKeys[key];
};

export const loadAttacks = () => {
  return Object.keys(attackKeys).map((key) => {
    return (
      <DragIcon
        key={key}
        type={ObjectType[key as AttackShapes]}
        src={attackStrings[key as AttackShapes]}
        alt={getIconName(key as AttackShapes)}
      />
    );
  });
};

const createAttackObject = (id: number): AttackObject => {
  return {
    id: id,
    label: "",
    type: ObjectType.Rect,
    color: "255,0,0",
    alpha: 0.5,
  };
};

export const createCone = (
  step: number,
  id: number,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject | string | number>(),
  parents = new Array<PossibleParentObject>()
): ConeObject => {
  return {
    ...createAttackObject(id),
    label: "coneAoe",
    type: ObjectType.Cone,
    angle: 70,
    radius: 250,
    [step]: {
      rotation: 0,
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createRect = (
  step: number,
  id: number,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject | string | number>(),
  parents = new Array<PossibleParentObject>()
): RectangleObject => {
  return {
    ...createAttackObject(id),
    label: "rectAoe",
    type: ObjectType.Rect,
    rotAt: "middle",
    size: { x: 150, y: 500 },
    [step]: {
      rotation: 0,
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createCircle = (
  step: number,
  id: number,
  pos = { x: 250, y: 250 },
  targets = new Array<Players | EnemyObject | string | number>(),
  parents = new Array<PossibleParentObject>()
): CircleObject => {
  return {
    ...createAttackObject(id),
    label: "circleAoe",
    type: ObjectType.Circle,
    radius: 100,
    [step]: {
      rotation: 0,
      pos: { x: pos.x, y: pos.y },
      targets: targets,
      parents: parents,
    },
  };
};

export const createAttack = (
  step: number,
  type: ObjectType,
  id: number,
  pos: { x: 250; y: 250 },
  parents = new Array<PossibleParentObject>(),
  targets = new Array<Players | EnemyObject | string | number>()
) => {
  switch (type) {
    case ObjectType.Circle:
      return createCircle(step, id, pos, targets, parents);
    case ObjectType.Cone:
      return createCone(step, id, pos, targets, parents);
    case ObjectType.Rect:
      return createRect(step, id, pos, targets, parents);
  }
};

export const attackKeys = {
  Cone: cone,
  Rect: rect,
  Circle: circle,
};

export type AttackShapes = keyof typeof attackKeys;

export const getAttacks = () => {
  return {
    ...attackKeys,
  };
};
