import {
  CircleObject,
  ConeObject,
  Point,
  RectangleObject,
  isAttacks,
  isWaymarks,
} from "../types";
import { rotateCanvas } from "./utils";
import { getTargets } from "./drawUtils";
import { calculateAngle } from "./maffs";
import {
  AnObject,
  isCircle,
  isCone,
  isEnemys,
  isPlayers,
  isRectangle,
} from "../types";

const handleTypes = {
  n: "n",
  s: "s",
  e: "e",
  w: "w",
  nw: "nw",
  ne: "ne",
  sw: "sw",
  se: "se",
  angleR: "angleR",
  angleL: "angleL",
  rotation: "rotation",
  center: "center",
} as const;

interface Handle {
  x: number;
  y: number;
  rot: number;
  type: keyof typeof handleTypes;
}

export const getHandles = (ele: AnObject, step: number): Handle[] => {
  if (isPlayers(ele) || isEnemys(ele)) {
    const cardHandles = getInterCardinalHandles(
      ele[step].pos,
      ele[step].size,
      ele[step].rotation
    );
    const rotHandle = getRotationHandle(
      ele[step].pos,
      ele[step].size,
      ele[step].rotation
    );

    return [...cardHandles, ...rotHandle];
  } else if (isAttacks(ele)) {
    if (ele[step].parents.length > 0) {
      return [];
    } else if (isRectangle(ele)) {
      if (ele.rotAt === "middle") {
        const cardHandles = getCardinalHandles(
          ele[step].pos,
          ele.size,
          ele[step].rotation
        );
        const interCardHandles = getInterCardinalHandles(
          ele[step].pos,
          ele.size,
          ele[step].rotation
        );
        const rotHandle = getRotationHandle(
          ele[step].pos,
          ele.size,
          ele[step].rotation
        );
        return [...cardHandles, ...interCardHandles, ...rotHandle];
      } else if (ele.rotAt === "bottom") {
        const newPos = {
          x: ele[step].pos.x,
          y: ele[step].pos.y - ele.size.y,
        };
        const cardHandles = getCardinalHandles(
          newPos,
          ele.size,
          ele[step].rotation
        );
        const interCardHandles = getInterCardinalHandles(
          newPos,
          ele.size,
          ele[step].rotation
        );
        const rotHandle = getRotationHandle(
          newPos,
          ele.size,
          ele[step].rotation
        );
        return [...cardHandles, ...interCardHandles, ...rotHandle];
      }
    } else if (isCircle(ele)) {
      return getCardinalHandles(
        ele[step].pos,
        { x: ele.radius * 2, y: ele.radius * 2 },
        0
      );
    } else if (isCone(ele)) {
      const coneHandles = getConeHandles(
        ele[step].pos,
        ele.radius * 2,
        ele.angle,
        ele[step].rotation
      );
      const rotHandle = getRotationHandle(
        ele[step].pos,
        { x: ele.radius * 2, y: ele.radius * 2 },
        ele[step].rotation
      );

      return [...coneHandles, ...rotHandle];
    }
  }
  return [];
};

const getCardinalHandles = (pos: Point, size: Point, rot: number): Handle[] => {
  const handles = [
    {
      x: pos.x,
      y: pos.y + size.y,
      rot,
      type: handleTypes.s,
    },
    {
      x: pos.x,
      y: pos.y - size.y,
      rot,
      type: handleTypes.n,
    },
    {
      x: pos.x + size.x,
      y: pos.y,
      rot,
      type: handleTypes.e,
    },
    {
      x: pos.x - size.x,
      y: pos.y,
      rot,
      type: handleTypes.w,
    },
  ];
  return handles;
};

const getInterCardinalHandles = (
  pos: Point,
  size: Point,
  rot: number
): Handle[] => {
  const handles = [
    {
      x: pos.x - size.x,
      y: pos.y - size.y,
      rot,
      type: handleTypes.nw,
    },
    {
      x: pos.x + size.x,
      y: pos.y - size.y,
      rot,
      type: handleTypes.ne,
    },
    {
      x: pos.x - size.x,
      y: pos.y + size.y,
      rot,
      type: handleTypes.sw,
    },
    {
      x: pos.x + size.x,
      y: pos.y + size.y,
      rot,
      type: handleTypes.se,
    },
  ];
  return handles;
};

const getRotationHandle = (pos: Point, size: Point, rot: number): Handle[] => {
  const handles = [
    {
      x: pos.x,
      y: pos.y - size.y - 60,
      rot,
      type: handleTypes.rotation,
    },
  ];
  return handles;
};

const getConeHandles = (
  pos: Point,
  radius: number,
  angle: number,
  rot: number
): Handle[] => {
  const angleRad = (angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;
  const x = pos.x + Math.cos(angleRad / 2 + start) * radius;
  const y = pos.y + Math.sin(angleRad / 2 + start) * radius;

  const x2 = pos.x + Math.cos(-angleRad / 2 + start) * radius;
  const y2 = pos.y + Math.sin(-angleRad / 2 + start) * radius;
  const handles = [
    {
      x: pos.x,
      y: pos.y - radius,
      rot,
      type: handleTypes.n,
    },
    {
      x: x,
      y: y,
      rot,
      type: handleTypes.angleR,
    },
    {
      x: x2,
      y: y2,
      rot,
      type: handleTypes.angleL,
    },
  ];
  return handles;
};

const drawHandles = (
  ctx: CanvasRenderingContext2D,
  rotPoint: Point,
  rot: number,
  handles: Handle[]
): void => {
  const handleSize = 14;
  ctx.save();
  ctx.translate(rotPoint.x, rotPoint.y);
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

const drawConesOutline = (
  ctx: CanvasRenderingContext2D,
  obj: ConeObject,
  step: number,
  allElements: AnObject[]
): void => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            if (angle !== 0) {
              ctx.translate(parent[step].pos.x, parent[step].pos.y);
              rotateCanvas(ctx, angle, parent[step].pos);
              ctx.translate(-parent[step].pos.x, -parent[step].pos.y);
            }
            drawConeOutline(
              ctx,
              parent[step].pos,
              obj.radius,
              obj.angle,
              obj[step].rotation
            );
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.translate(parent[step].pos.x, parent[step].pos.y);
        rotateCanvas(
          ctx,
          obj[step].rotation + parent[step].rotation,
          parent[step].pos
        );
        ctx.translate(-parent[step].pos.x, -parent[step].pos.y);
        drawConeOutline(
          ctx,
          parent[step].pos,
          obj.radius,
          obj.angle,
          obj[step].rotation
        );
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.translate(obj[step].pos.x, obj[step].pos.y);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    ctx.translate(-obj[step].pos.x, -obj[step].pos.y);
    drawConeOutline(
      ctx,
      obj[step].pos,
      obj.radius,
      obj.angle,
      obj[step].rotation
    );
    ctx.restore();
  }
};

const drawRectsOutline = (
  ctx: CanvasRenderingContext2D,
  obj: RectangleObject,
  step: number,
  allElements: AnObject[]
): void => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            if (angle !== 0) {
              ctx.translate(parent[step].pos.x, parent[step].pos.y);
              rotateCanvas(ctx, angle, parent[step].pos);
              ctx.translate(-parent[step].pos.x, -parent[step].pos.y);
            }
            drawRectOutline(ctx, parent[step].pos, obj.size, 0, obj.rotAt);
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.translate(parent[step].pos.x, parent[step].pos.y);
        rotateCanvas(
          ctx,
          obj[step].rotation + parent[step].rotation,
          parent[step].pos
        );
        ctx.translate(-parent[step].pos.x, -parent[step].pos.y);
        drawRectOutline(
          ctx,
          parent[step].pos,
          obj.size,
          obj[step].rotation,
          obj.rotAt
        );
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.translate(obj[step].pos.x, obj[step].pos.y);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    ctx.translate(-obj[step].pos.x, -obj[step].pos.y);
    drawRectOutline(
      ctx,
      obj[step].pos,
      obj.size,
      obj[step].rotation,
      obj.rotAt
    );
    ctx.restore();
  }
};

const drawCirclesOutline = (
  ctx: CanvasRenderingContext2D,
  obj: CircleObject,
  step: number,
  allElements: AnObject[]
): void => {
  ctx.save();
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            drawCircleOutline(ctx, target[step].pos, obj.radius);
          });
        });
      } else {
        drawCircleOutline(ctx, parent[step].pos, obj.radius);
      }
    });
  } else {
    drawCircleOutline(ctx, obj[step].pos, obj.radius);
  }
  ctx.restore();
};

const drawRectOutline = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  size: Point,
  rot: number,
  rotAt: "middle" | "bottom" = "middle"
): void => {
  let x, y;
  if (rotAt === "bottom") {
    x = pos.x - size.x;
    y = pos.y - size.y * 2;
  } else {
    x = pos.x - size.x;
    y = pos.y - size.y;
  }
  ctx.save();
  ctx.translate(pos.x, pos.y);
  rotateCanvas(ctx, rot, pos);
  ctx.beginPath();
  ctx.rect(x, y, size.x * 2, size.y * 2);
  ctx.strokeStyle = "rgba(200, 220, 255, 1)";
  ctx.stroke();
  ctx.restore();
};

const drawConeOutline = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  radius: number,
  angle: number,
  rot: number
): void => {
  const angle2 = (angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius * 2, -angle2 / 2 + start, angle2 / 2 + start);
  ctx.lineTo(pos.x, pos.y);
  ctx.closePath();
  ctx.strokeStyle = "rgba(200, 220, 255, 1)";
  ctx.stroke();
  ctx.restore();
};

const drawCircleOutline = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  radius: number
): void => {
  ctx.save();
  ctx.scale(2, 2);
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(200, 220, 255, 1)";
  ctx.stroke();
  ctx.restore();
};

export const drawHandlesForSelected = (
  ctx: CanvasRenderingContext2D,
  selected: AnObject,
  step: number,
  allElements: AnObject[]
): void => {
  if (selected) {
    const handles = getHandles(selected, step);
    if (handles.length !== 0) {
      drawHandles(ctx, selected[step].pos, selected[step].rotation, handles);
    }

    if (selected.type === "rect") {
      drawRectsOutline(ctx, selected, step, allElements);
      /*
      drawRectOutline(
        ctx,
        selected[step].pos,
        selected.size,
        selected[step].rotation
      );
      */
    }
    if (selected.type === "circle") {
      drawCirclesOutline(ctx, selected, step, allElements);
      //drawCircleOutline(ctx, selected[step].pos, selected.radius);
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
