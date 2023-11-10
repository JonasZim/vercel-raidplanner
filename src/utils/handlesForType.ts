import {
  AnObject,
  EnemyObject,
  Players,
  Point,
  WaymarkObject,
  isEnemys,
  isPlayers,
  isWaymarks,
  objectsWithAngle,
  objectsWithRadius,
  objectsWithSize,
  radiusObject,
} from "../types";
import { handleTypes, Handle } from "./drawing/drawHandles";
import { calcPointForAngle, calculateAngle } from "./maffs";

export const objectHandles = (
  midPoint: Point,
  width: number,
  height: number
): Handle[] => {
  return [
    {
      x: midPoint.x - width / 2,
      y: midPoint.y - height / 2,
      rot: 0,
      type: handleTypes.nw,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x + width / 2,
      y: midPoint.y - height / 2,
      rot: 0,
      type: handleTypes.ne,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x - width / 2,
      y: midPoint.y + height / 2,
      rot: 0,
      type: handleTypes.sw,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x + width / 2,
      y: midPoint.y + height / 2,
      rot: 0,
      type: handleTypes.se,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y - height / 2 - 30,
      rot: 0,
      type: handleTypes.rotation,
    },
  ];
};

export const rectHandles = (
  midPoint: Point,
  width: number,
  height: number
): Handle[] => {
  return [
    {
      x: midPoint.x - width / 2,
      y: midPoint.y - height / 2,
      rot: 0,
      type: handleTypes.nw,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x + width / 2,
      y: midPoint.y - height / 2,
      rot: 0,
      type: handleTypes.ne,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x - width / 2,
      y: midPoint.y + height / 2,
      rot: 0,
      type: handleTypes.sw,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x + width / 2,
      y: midPoint.y + height / 2,
      rot: 0,
      type: handleTypes.se,
      handling: NWHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y - height / 2,
      rot: 0,
      type: handleTypes.n,
      handling: NSHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y + height / 2,
      rot: 0,
      type: handleTypes.s,
      handling: NSHandleOnDrag,
    },
    {
      x: midPoint.x - width / 2,
      y: midPoint.y,
      rot: 0,
      type: handleTypes.w,
      handling: EWHandleOnDrag,
    },
    {
      x: midPoint.x + width / 2,
      y: midPoint.y,
      rot: 0,
      type: handleTypes.e,
      handling: EWHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y - height / 2 - 30,
      rot: 0,
      type: handleTypes.rotation,
      handling: RotHandleOnDrag,
    },
  ];
};

export const circleHandles = (midPoint: Point, radius: number): Handle[] => {
  return [
    {
      x: midPoint.x,
      y: midPoint.y - radius,
      rot: 0,
      type: handleTypes.n,
      handling: RadiusHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y + radius,
      rot: 0,
      type: handleTypes.s,
      handling: RadiusHandleOnDrag,
    },
    {
      x: midPoint.x - radius,
      y: midPoint.y,
      rot: 0,
      type: handleTypes.w,
      handling: RadiusHandleOnDrag,
    },
    {
      x: midPoint.x + radius,
      y: midPoint.y,
      rot: 0,
      type: handleTypes.e,
      handling: RadiusHandleOnDrag,
    },
  ];
};

export const coneHandles = (
  midPoint: Point,
  radius: number,
  angle: number
): Handle[] => {
  const angleRad = (angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;
  const x = midPoint.x + Math.cos(angleRad / 2 + start) * radius;
  const y = midPoint.y + Math.sin(angleRad / 2 + start) * radius;

  const x2 = midPoint.x + Math.cos(-angleRad / 2 + start) * radius;
  const y2 = midPoint.y + Math.sin(-angleRad / 2 + start) * radius;
  const handles = [
    {
      x: midPoint.x,
      y: midPoint.y - radius,
      rot: 0,
      type: handleTypes.n,
      handling: RadiusHandleOnDrag,
    },
    {
      x: x,
      y: y,
      rot: 0,
      type: handleTypes.angleR,
      handling: AngleRHandleOnDrag,
    },
    {
      x: x2,
      y: y2,
      rot: 0,
      type: handleTypes.angleL,
      handling: AngleLHandleOnDrag,
    },
    {
      x: midPoint.x,
      y: midPoint.y - radius - 30,
      rot: 0,
      type: handleTypes.rotation,
      handling: RotHandleOnDrag,
    },
  ];
  return handles;
};

export const NWHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithSize,
  step: number
) => {
  let pos: Point;

  if (isWaymarks(ele)) {
    pos = ele.pos;
  } else {
    pos = ele[step].pos;
  }
  const newPos = {
    x: mousePos.x - offset.x,
    y: mousePos.y - offset.y,
  };
  const newSize = {
    x: Math.round(Math.abs(pos.x - newPos.x) * 2),
    y: Math.round(Math.abs(pos.y - newPos.y) * 2),
  };
  if (isPlayers(ele) || isEnemys(ele)) {
    ele[step].size = newSize;
  } else {
    ele.size = newSize;
  }
};

const EWHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithSize,
  step: number
) => {
  let pos: Point;

  if (isWaymarks(ele)) {
    pos = ele.pos;
  } else {
    pos = ele[step].pos;
  }
  const newPos = {
    x: mousePos.x - offset.x,
    y: pos.y,
  };
  const newSize = Math.round(Math.abs(pos.x - newPos.x) * 2);
  if (isPlayers(ele) || isEnemys(ele)) {
    ele[step].size.x = newSize;
  } else {
    ele.size.x = newSize;
  }
};

const NSHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithSize,
  step: number
) => {
  let pos: Point;

  if (isWaymarks(ele)) {
    pos = ele.pos;
  } else {
    pos = ele[step].pos;
  }
  const newPos = {
    x: pos.x,
    y: mousePos.y - offset.y,
  };
  const newSize = Math.round(Math.abs(pos.y - newPos.y) * 2);
  if (isPlayers(ele) || isEnemys(ele)) {
    ele[step].size.y = newSize;
  } else {
    ele.size.y = newSize;
  }
};

const RotHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithSize,
  step: number
) => {
  let pos: Point;
  if (isWaymarks(ele)) {
    pos = ele.pos;
  } else {
    pos = ele[step].pos;
  }
  const newPos = {
    x: mousePos.x - offset.x,
    y: mousePos.y - offset.y,
  };
  const newRot = Math.atan2(newPos.y - pos.y, newPos.x - pos.x);
  ele[step].rotation = Math.round((newRot * 180) / Math.PI + 90);
};

const RadiusHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithRadius,
  step: number
) => {
  const pos = ele[step].pos;
  const newPos = {
    x: mousePos.x - offset.x,
    y: mousePos.y - offset.y,
  };
  const newRadius = Math.sqrt(
    Math.pow(newPos.x - pos.x, 2) + Math.pow(newPos.y - pos.y, 2)
  );
  ele.radius = Math.round(newRadius);
};

const AngleLHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithAngle,
  step: number
) => {
  const pos = ele[step].pos;
  const newPos = {
    x: mousePos.x - offset.x,
    y: mousePos.y - offset.y,
  };

  const adjustedPoint = calcPointForAngle(
    (ele[step].rotation * Math.PI) / 180,
    pos,
    newPos
  );

  const northPos = {
    x: pos.x,
    y: pos.y - ele.radius,
  };

  const newAngle =
    (-(calculateAngle(northPos, adjustedPoint, pos) % 360) * 2) % 360;
  ele.angle = Math.round(newAngle);
};

const AngleRHandleOnDrag = (
  mousePos: Point,
  offset: Point,
  ele: objectsWithAngle,
  step: number
) => {
  const pos = ele[step].pos;
  const newPos = {
    x: mousePos.x - offset.x,
    y: mousePos.y - offset.y,
  };

  const adjustedPoint = calcPointForAngle(
    (ele[step].rotation * Math.PI) / 180,
    pos,
    newPos
  );

  const northPos = {
    x: pos.x,
    y: pos.y - ele.radius,
  };
  const newAngle =
    (-(calculateAngle(adjustedPoint, northPos, pos) % 360) * 2) % 360;
  ele.angle = Math.round(newAngle);
};
