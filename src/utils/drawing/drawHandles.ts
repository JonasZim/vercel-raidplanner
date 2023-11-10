import { Point, isToppings, isWaymarks } from "../../types";
import { rotateCanvas } from "../utils";
import { calcPointForAngle } from "../maffs";
import {
  AnObject,
  isCircle,
  isCone,
  isEnemys,
  isPlayers,
  isRectangle,
} from "../../types";

import {
  rectHandles,
  circleHandles,
  coneHandles,
  objectHandles,
} from "../handlesForType";

import {
  drawRectOutline,
  drawRectsOutline,
  drawConesOutline,
  drawCirclesOutline,
} from "./drawSelectionOutline";

export const handleTypes = {
  n: "n",
  ne: "ne",
  e: "e",
  se: "se",
  s: "s",
  sw: "sw",
  w: "w",
  nw: "nw",
  angleR: "angleR",
  angleL: "angleL",
  rotation: "rotation",
  center: "center",
} as const;

export interface Handle {
  x: number;
  y: number;
  rot: number;
  type: keyof typeof handleTypes;
  handling?: Function;
}

export interface handleDragType {
  offset: Point;
  type: keyof typeof handleTypes;
  handling?: Function;
}

const drawHandles = (
  ctx: CanvasRenderingContext2D,
  rotPoint: Point,
  rot: number,
  handles: Handle[]
): void => {
  const handleSize = 7;
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(0, 0);
  rotateCanvas(ctx, rot, rotPoint);
  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.rect(
      handle.x - handleSize / 2,
      handle.y - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.strokeStyle = "rgba(200, 220, 255, 1)";
    ctx.stroke();
    ctx.fillStyle = "rgba(200, 220, 255, 1)";
    ctx.fill();
  });
  ctx.restore();
};

export const drawHandlesAndOultine = (
  ctx: CanvasRenderingContext2D,
  selected: AnObject,
  step: number,
  allElements: AnObject[]
): void => {
  if (selected) {
    const handles = getHandlesForType(selected, step);
    if (handles !== undefined && handles.length !== 0) {
      const pos = isWaymarks(selected) ? selected.pos : selected[step].pos;
      let rot = 0;
      if (
        !(isWaymarks(selected) || isToppings(selected) || isCircle(selected))
      ) {
        rot = selected[step].rotation;
      }
      drawHandles(ctx, pos, rot, handles);
    }

    if (selected.type === "rect") {
      drawRectsOutline(ctx, selected, step, allElements);
    }
    if (selected.type === "circle") {
      drawCirclesOutline(ctx, selected, step, allElements);
    }
    if (selected.type === "cone") {
      drawConesOutline(ctx, selected, step, allElements);
    }
    if (isPlayers(selected) || isEnemys(selected)) {
      drawRectOutline(
        ctx,
        selected[step].pos,
        selected[step].size,
        selected[step].rotation
      );
    }
  }
};

const getHandlesForType = (ele: AnObject, step: number) => {
  if (isEnemys(ele) || isPlayers(ele)) {
    return rectHandles(ele[step].pos, ele[step].size.x, ele[step].size.y);
  }
  if (isWaymarks(ele)) {
    return rectHandles(ele.pos, ele.size.x, ele.size.y);
  }
  if (isToppings(ele)) {
    return rectHandles(ele[step].pos, ele.size.x, ele.size.y);
  }
  if (isRectangle(ele)) {
    if (ele.rotAt === "bottom") {
      return rectHandles(
        { x: ele[step].pos.x, y: ele[step].pos.y - ele.size.y / 2 },
        ele.size.x,
        ele.size.y
      );
    } else {
      return rectHandles(ele[step].pos, ele.size.x, ele.size.y);
    }
  }
  if (isCircle(ele)) {
    return circleHandles(ele[step].pos, ele.radius);
  }
  if (isCone(ele)) {
    return coneHandles(ele[step].pos, ele.radius, ele.angle);
  }
};

//TODO shift this to another place
export const checkHandleHitbox = (
  obj: AnObject,
  step: number,
  mousePos: Point
): handleDragType | null => {
  const handles = getHandlesForType(obj, step);
  const rot =
    isWaymarks(obj) || isToppings(obj) || isCircle(obj)
      ? 0
      : obj[step].rotation;
  const pos = isWaymarks(obj) ? obj.pos : obj[step].pos;
  const adjustedPoint = calcPointForAngle(
    (-rot * Math.PI) / 180,
    pos,
    mousePos
  );

  const handleSize = 14;
  let hitHandle: keyof typeof handleTypes | null = null;
  let hitOffset: Point | null = null;
  let handling: Function | null = null;
  handles?.forEach((handle) => {
    let offsetX = Math.abs(handle.x - adjustedPoint.x);
    let offsetY = Math.abs(handle.y - adjustedPoint.y);
    if (offsetX < handleSize / 2 && offsetY < handleSize / 2) {
      hitOffset = {
        x: handle.x - adjustedPoint.x,
        y: handle.y - adjustedPoint.y,
      };
      hitHandle = handle.type;
      handling = handle.handling ? handle.handling : null;
    }
  });
  if (hitOffset === null || hitHandle === null) {
    return null;
  }
  if (handling !== null) {
    return { offset: hitOffset, type: hitHandle, handling: handling };
  }
  return { offset: hitOffset, type: hitHandle };
};
