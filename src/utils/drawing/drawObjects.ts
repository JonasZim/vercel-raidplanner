import {
  AnObject,
  CircleObject,
  ConeObject,
  EnemyObject,
  Players,
  Point,
  RectangleObject,
  ToppingObject,
  WaymarkObject,
  isCircle,
  isCone,
  isEnemys,
  isPlayers,
  isRectangle,
  isToppings,
  isWaymarks,
} from "../../types";
import { getTargets } from "./drawUtils";
import { calculateAngle } from "../maffs";
import { rotateCanvas } from "../utils";

export const drawAnObject = (
  ctx: CanvasRenderingContext2D,
  obj: AnObject,
  step: number,
  allElements: AnObject[],
  images: Map<string, HTMLImageElement>
) => {
  if (isPlayers(obj) || isEnemys(obj)) {
    drawIcon(ctx, obj, step, images);
  } else if (isToppings(obj)) {
    drawTopping(ctx, obj, step);
  } else if (isWaymarks(obj)) {
    drawWaymark(ctx, obj);
  } else if (isCircle(obj)) {
    drawCircles(ctx, obj, step, allElements);
  } else if (isRectangle(obj)) {
    drawRects(ctx, obj, step, allElements);
  } else if (isCone(obj)) {
    drawCones(ctx, obj, step, allElements);
  }
};

const drawIcon = (
  ctx: CanvasRenderingContext2D,
  obj: Players | EnemyObject,
  step: number,
  images: Map<string, HTMLImageElement>
) => {
  ctx.save();
  ctx.scale(2, 2);
  if (obj[step].rotation !== 0) {
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
  }
  const img = new Image();
  img.src = obj.iconString;

  const iconImage = images.get(obj.type);

  const imageToDraw = iconImage ? iconImage : img;
  ctx.drawImage(
    imageToDraw,
    obj[step].pos.x - obj[step].size.x / 2,
    obj[step].pos.y - obj[step].size.y / 2,
    obj[step].size.x,
    obj[step].size.y
  );
  ctx.restore();
};

const drawTopping = (
  ctx: CanvasRenderingContext2D,
  obj: ToppingObject,
  step: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  const img = new Image();
  img.src = obj.iconString;
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent) => {
      ctx.drawImage(
        img,
        parent[step].pos.x - obj.size.x / 2 - obj.offset.x,
        parent[step].pos.y - obj.size.y / 2 - obj.offset.y,
        obj.size.x,
        obj.size.y
      );
    });
  } else {
    ctx.drawImage(
      img,
      obj[step].pos.x - obj.size.x / 2,
      obj[step].pos.y - obj.size.y / 2,
      obj.size.x,
      obj.size.y
    );
  }
  ctx.restore();
};

const drawWaymark = (ctx: CanvasRenderingContext2D, obj: WaymarkObject) => {
  ctx.save();
  ctx.scale(2, 2);
  const img = new Image();
  img.src = obj.iconString;
  ctx.drawImage(
    img,
    obj.pos.x - obj.size.x / 2,
    obj.pos.y - obj.size.y / 2,
    obj.size.x,
    obj.size.y
  );

  if (obj.shape === "circle") {
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.arc(obj.pos.x, obj.pos.y, obj.size.x / 2 + 3, 0, 2 * Math.PI);
    ctx.strokeStyle = obj.color;
    ctx.stroke();
  } else if (obj.shape === "square") {
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.rect(
      obj.pos.x - obj.size.x / 2,
      obj.pos.y - obj.size.y / 2,
      obj.size.x + 3,
      obj.size.y + 3
    );
    ctx.strokeStyle = obj.color;
    ctx.stroke();
  }

  ctx.restore();
};

const drawCircles = (
  ctx: CanvasRenderingContext2D,
  obj: CircleObject,
  step: number,
  allElements: AnObject[]
) => {
  ctx.save();
  ctx.scale(2, 2);
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.beginPath();
            ctx.arc(
              target[step].pos.x,
              target[step].pos.y,
              obj.radius,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
            ctx.fill();
          });
        });
      } else {
        ctx.beginPath();
        ctx.arc(
          parent[step].pos.x,
          parent[step].pos.y,
          obj.radius,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
        ctx.fill();
      }
    });
  } else {
    ctx.beginPath();
    ctx.arc(obj[step].pos.x, obj[step].pos.y, obj.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  }
  ctx.restore();
};

const drawRects = (
  ctx: CanvasRenderingContext2D,
  obj: RectangleObject,
  step: number,
  allElements: AnObject[]
) => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            ctx.scale(2, 2);
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            if (angle !== 0) {
              rotateCanvas(ctx, angle, parent[step].pos);
            }
            drawRectFunc(ctx, obj, step, parent[step].pos);
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.scale(2, 2);
        if (obj[step].rotation + parent[step].rotation !== 0) {
          rotateCanvas(
            ctx,
            obj[step].rotation + parent[step].rotation,
            parent[step].pos
          );
        }
        drawRectFunc(ctx, obj, step, parent[step].pos);
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.scale(2, 2);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    drawRectFunc(ctx, obj, step, obj[step].pos);
    ctx.restore();
  }
};

const drawRectFunc = (
  ctx: CanvasRenderingContext2D,
  obj: RectangleObject,
  step: number,
  drawPos: Point
) => {
  if (obj.rotAt === "middle") {
    ctx.beginPath();
    ctx.rect(
      drawPos.x - obj.size.x / 2,
      drawPos.y - obj.size.y / 2,
      obj.size.x,
      obj.size.y
    );
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  } else if (obj.rotAt === "bottom") {
    ctx.beginPath();
    ctx.rect(
      drawPos.x - obj.size.x / 2,
      drawPos.y - obj.size.y,
      obj.size.x,
      obj.size.y
    );
    ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
    ctx.fill();
  }
};

const drawCones = (
  ctx: CanvasRenderingContext2D,
  obj: ConeObject,
  step: number,
  allElements: AnObject[]
) => {
  if (obj[step].parents.length > 0) {
    obj[step].parents.forEach((parent, index) => {
      if (obj[step].targets.length > 0) {
        const targetObjects = getTargets(obj, index, allElements, step);
        targetObjects.forEach((targetGroup) => {
          targetGroup.forEach((target) => {
            ctx.save();
            ctx.scale(2, 2);
            const angle = calculateAngle(parent[step].pos, target[step].pos, {
              x: parent[step].pos.x,
              y: parent[step].pos.y + 1,
            });
            if (angle !== 0) {
              rotateCanvas(ctx, angle, parent[step].pos);
            }
            drawConeFunc(ctx, obj, step, parent[step].pos);
            ctx.restore();
          });
        });
      } else {
        ctx.save();
        ctx.scale(2, 2);
        rotateCanvas(
          ctx,
          obj[step].rotation + parent[step].rotation,
          parent[step].pos
        );
        drawConeFunc(ctx, obj, step, parent[step].pos);
        ctx.restore();
      }
    });
  } else {
    ctx.save();
    ctx.scale(2, 2);
    rotateCanvas(ctx, obj[step].rotation, obj[step].pos);
    drawConeFunc(ctx, obj, step, obj[step].pos);
    ctx.restore();
  }
};

const drawConeFunc = (
  ctx: CanvasRenderingContext2D,
  obj: ConeObject,
  step: number,
  drawPos: Point
) => {
  const angle = (obj.angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;

  ctx.beginPath();
  ctx.arc(
    drawPos.x,
    drawPos.y,
    obj.radius,
    -angle / 2 + start,
    angle / 2 + start
  );
  ctx.lineTo(drawPos.x, drawPos.y);
  ctx.closePath();
  ctx.fillStyle = `rgba(${obj.color}, ${obj.alpha})`;
  ctx.fill();
};
