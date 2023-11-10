import { handleDragType } from "./drawing/drawHandles";
import { handleTypes } from "./drawing/drawHandles";
import { resizableObject } from "../types";

import {
  AnObject,
  Point,
  isEnemys,
  isPlayers,
  isWaymarks,
  isRectangle,
  isCircle,
  isCone,
} from "../types";

export const resizeElement = (
  ele: AnObject,
  handleDrag: handleDragType,
  mousePos: Point,
  step: number
) => {
  if (isEnemys(ele) || isPlayers(ele) || isWaymarks(ele)) {
  }
  if (isRectangle(ele)) {
    if (ele.rotAt === "bottom") {
    } else {
    }
  }
  if (isCircle(ele)) {
  }
  if (isCone(ele)) {
  }
};

const resizeObject = (
  ele: AnObject,
  handleDrag: handleDragType,
  mousePos: Point,
  step: number
) => {
  const type = handleDrag.type;
  if (handleDrag.type === handleTypes.nw) {
    changeHnW(ele, mousePos, step);
  }
};

const changeHnW = (ele: AnObject, mousePos: Point, step: number) => {};
