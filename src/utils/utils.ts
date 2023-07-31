import { EnemyObject, Players, Point, PossibleParentObject } from "../types";
import { createCone, createCircle, createRect } from "./loadAttacks";
import { createEnemy } from "./loadBoss";
import { createLcObject } from "./loadLimitCut";
import { createJob } from "./loadIcons";
import { createDsrObject } from "./loadLimitCut";
import { createWaymarkObject } from "./loadWaymarks";

export const valuesToInt = (values: string[]) => {
  return values.map((value) => {
    if (value === "") {
      return Infinity;
    }
    return parseInt(value);
  });
};

export const valuesMaybeToInt = (values: string[]) => {
  return values.map((value) => {
    if (
      value === "1" ||
      value === "2" ||
      value === "3" ||
      value === "4" ||
      value === "5" ||
      value === "6" ||
      value === "7" ||
      value === "8"
    ) {
      return parseInt(value);
    }
    return value;
  });
};

export const rotateCanvas = (
  ctx: CanvasRenderingContext2D,
  degree: number,
  point: Point
) => {
  ctx.translate(point.x, point.y);
  ctx.rotate((degree * Math.PI) / 180);
  ctx.translate(-point.x, -point.y);
};

export const createAnObject = (
  type: string,
  step: number,
  id = 0,
  pos = { x: 250, y: 250 },
  parents = new Array<PossibleParentObject>(),
  targets = new Array<Players | EnemyObject | string | number>()
) => {
  switch (type) {
    case "pld":
    case "war":
    case "drk":
    case "gnb":
    case "whm":
    case "sch":
    case "ast":
    case "sge":
    case "mnk":
    case "drg":
    case "nin":
    case "sam":
    case "rpr":
    case "brd":
    case "mch":
    case "dnc":
    case "blm":
    case "rdm":
    case "smn":
    case "tank":
    case "healer":
    case "melee":
    case "ranged":
    case "caster": {
      return createJob(step, type, id, pos);
    }
    case "lc1":
    case "lc2":
    case "lc3":
    case "lc4":
    case "lc5":
    case "lc6":
    case "lc7":
    case "lc8": {
      return createLcObject(type, step, id, parents, pos);
    }
    case "dsrX":
    case "dsrO":
    case "dsrSquare":
    case "dsrTriangle": {
      return createDsrObject(type, step, id, parents, pos);
    }
    case "way1":
    case "way2":
    case "way3":
    case "way4":
    case "wayA":
    case "wayB":
    case "wayC":
    case "wayD": {
      return createWaymarkObject(type, id, pos);
    }
    case "Boss": {
      return createEnemy(step, type, id, pos);
    }
    case "cone": {
      return createCone(step, id, pos, targets, parents);
    }
    case "circle": {
      return createCircle(step, id, pos, targets, parents);
    }
    case "rect": {
      return createRect(step, id, pos, targets, parents);
    }
    default:
      throw new Error(`Invalid object type: ${type}`);
  }
};
