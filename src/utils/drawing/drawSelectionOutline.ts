import {
  AnObject,
  CircleObject,
  ConeObject,
  Point,
  RectangleObject,
} from "../../types";
import { getTargets } from "./drawUtils";
import { calculateAngle } from "../maffs";
import { rotateCanvas } from "../utils";

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

export {
  drawConesOutline,
  drawRectsOutline,
  drawCirclesOutline,
  drawRectOutline,
};
