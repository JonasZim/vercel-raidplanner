import {
  Point,
  AnObject,
  EnemyObject,
  isPlayers,
  Players,
  isEnemys,
  isToppings,
  ToppingObject,
  isWaymarks,
  WaymarkObject,
  isCircle,
  isRectangle,
  isCone,
  CircleObject,
  RectangleObject,
  ConeObject,
  Attacc,
  baseObject,
  isDpss,
  isHealers,
  isTanks,
  ObjectType,
} from "../types";
import { rotateCanvas } from "./utils";
import { calcDistance, calculateAngle } from "./maffs";

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

export const drawIcon = (
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

  const drawImage = iconImage ? iconImage : img;
  ctx.drawImage(
    drawImage,
    obj[step].pos.x - obj[step].size.x / 2,
    obj[step].pos.y - obj[step].size.y / 2,
    obj[step].size.x,
    obj[step].size.y
  );
  ctx.restore();
};

export const drawTopping = (
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

export const drawWaymark = (
  ctx: CanvasRenderingContext2D,
  obj: WaymarkObject
) => {
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

export const drawCircles = (
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

export const drawRects = (
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

export const drawCones = (
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

const getPlayersByDistance = (
  players: Players[],
  point: Point,
  step: number
) => {
  return players.sort((a: Players, b: Players) => {
    const aDist = calcDistance(a[step].pos, point);
    const bDist = calcDistance(b[step].pos, point);
    if (aDist === 0) {
      return Infinity;
    }
    if (bDist === 0) {
      return -Infinity;
    }
    return aDist - bDist;
  });
};

const getPlayer = (objects: AnObject[]): Players[] => {
  return objects.filter((element: AnObject) => {
    return isPlayers(element);
  }) as Players[];
};

const getTargets = (
  attack: Attacc,
  parent: number,
  allElements: AnObject[],
  step: number
): Players[][] => {
  const players = getPlayer(allElements as AnObject[]);
  const playerByDist = getPlayersByDistance(
    players,
    attack[step].parents[parent][step].pos,
    step
  );
  if (!attack[step].targets) return [];
  return attack[step].targets.map((tar: number | string | baseObject) => {
    if (typeof tar === "number") {
      return [playerByDist[tar - 1]];
    } else {
      switch (tar) {
        case "dps": {
          return players.filter((player: Players) => {
            return isDpss(player);
          });
        }
        case "healer": {
          return players.filter((player: Players) => {
            return isHealers(player);
          });
        }
        case "tank": {
          return players.filter((player: Players) => {
            return isTanks(player);
          });
        }
        case "support": {
          return players.filter((player: Players) => {
            return isTanks(player) || isHealers(player);
          });
        }
        default: {
          return [];
        }
      }
    }
  });
};

export const drawElementSelection = (
  ctx: CanvasRenderingContext2D,
  selectedElement: AnObject,
  step: number
) => {
  if (isPlayers(selectedElement) || isEnemys(selectedElement)) {
    drawIntercardinalHandles(
      ctx,
      selectedElement[step].pos,
      selectedElement[step].size,
      selectedElement[step].rotation
    );
  } else if (isRectangle(selectedElement)) {
    drawIntercardinalHandles(
      ctx,
      selectedElement[step].pos,
      selectedElement.size,
      selectedElement[step].rotation
    );
    drawCardinalHandles(
      ctx,
      selectedElement[step].pos,
      selectedElement.size,
      selectedElement[step].rotation
    );
  } else if (isCone(selectedElement)) {
    drawHandleForCones(
      ctx,
      selectedElement[step].pos,
      selectedElement.radius,
      selectedElement.angle,
      selectedElement[step].rotation
    );
  } else if (isCircle(selectedElement)) {
    drawCardinalHandles(
      ctx,
      selectedElement[step].pos,
      { x: selectedElement.radius * 2, y: selectedElement.radius * 2 },
      0
    );
  }
};

const drawHandle = (ctx: CanvasRenderingContext2D, pos: Point) => {
  const handleSize = 8;
  ctx.beginPath();
  ctx.rect(
    pos.x - handleSize / 2,
    pos.y - handleSize / 2,
    handleSize,
    handleSize
  );
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.fillStyle = "rgba(200, 220, 255, 1)";
  ctx.fill();
};

const drawCardinalHandles = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  size: Point,
  rotation: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  rotateCanvas(ctx, rotation, pos);
  drawHandle(ctx, { x: pos.x, y: pos.y - size.y / 2 });
  drawHandle(ctx, { x: pos.x, y: pos.y + size.y / 2 });
  drawHandle(ctx, { x: pos.x - size.x / 2, y: pos.y });
  drawHandle(ctx, { x: pos.x + size.x / 2, y: pos.y });
  ctx.restore();
};

const drawIntercardinalHandles = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  size: Point,
  rotation: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  rotateCanvas(ctx, rotation, pos);
  drawHandle(ctx, { x: pos.x - size.x / 2, y: pos.y - size.y / 2 });
  drawHandle(ctx, { x: pos.x + size.x / 2, y: pos.y - size.y / 2 });
  drawHandle(ctx, { x: pos.x - size.x / 2, y: pos.y + size.y / 2 });
  drawHandle(ctx, { x: pos.x + size.x / 2, y: pos.y + size.y / 2 });
  ctx.restore();
};

const drawHandleForCones = (
  ctx: CanvasRenderingContext2D,
  pos: Point,
  radius: number,
  angle: number,
  rotation: number
) => {
  ctx.save();
  ctx.scale(2, 2);
  rotateCanvas(ctx, rotation, pos);
  drawHandle(ctx, { x: pos.x, y: pos.y - radius });
  drawHandle(ctx, { x: pos.x, y: pos.y });
  const angleRad = (angle * Math.PI) / 180;
  const start = (-90 * Math.PI) / 180;
  let x = pos.x + Math.cos(angleRad / 2 + start) * radius;
  let y = pos.y + Math.sin(angleRad / 2 + start) * radius;
  drawHandle(ctx, { x, y });
  x = pos.x + Math.cos(-angleRad / 2 + start) * radius;
  y = pos.y + Math.sin(-angleRad / 2 + start) * radius;
  drawHandle(ctx, { x, y });
  ctx.restore();
};
