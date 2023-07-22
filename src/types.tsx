export interface Point {
  x: number;
  y: number;
}

export enum ObjectType {
  Player = "player",
  Enemy = "enemy",
  Boss = "boss",
  Topping = "topping",
  Playstation = "playstation",
  LimitCut = "limitcut",
  Waymark = "waymark",
  Cone = "cone",
  Rect = "rect",
  Circle = "circle",
  Triangle = "triangle",

  tank = "tank",
  healer = "healer",
  dps = "dps",
  melee = "melee",
  ranged = "ranged",
  caster = "caster",

  pld = "pld",
  war = "war",
  drk = "drk",
  gnb = "gnb",
  whm = "whm",
  sch = "sch",
  ast = "ast",
  sge = "sge",
  mnk = "mnk",
  drg = "drg",
  nin = "nin",
  sam = "sam",
  rpr = "rpr",
  brd = "brd",
  mch = "mch",
  dnc = "dnc",
  blm = "blm",
  rdm = "rdm",
  smn = "smn",
  blu = "blu",

  lc1 = "lc1",
  lc2 = "lc2",
  lc3 = "lc3",
  lc4 = "lc4",
  lc5 = "lc5",
  lc6 = "lc6",
  lc7 = "lc7",
  lc8 = "lc8",

  dsrX = "dsrX",
  dsrO = "dsrO",
  dsrSquare = "dsrSquare",
  dsrTriangle = "dsrTriangle",

  way1 = "way1",
  way2 = "way2",
  way3 = "way3",
  way4 = "way4",
  wayA = "wayA",
  wayB = "wayB",
  wayC = "wayC",
  wayD = "wayD",
}

export interface baseObject {
  id: number;
  label: string;
  type: ObjectType;
  [key: number]: any;
}

export interface rotatableObject {
  rotation: number;
}

export interface movableObject {
  pos: Point;
}

export interface colorableObject {
  color: string;
  alpha: number;
}

export interface resizableObject {
  size: Point;
}

export interface imageObject {
  iconString: string;
}

export interface radiusObject {
  radius: number;
}

export interface angleObject {
  angle: number;
}

export interface attachableObject {
  parents: PossibleParentObject[];
}

export interface ToppingObject
  extends baseObject,
    imageObject,
    resizableObject {
  offset: Point;
  type:
    | ObjectType.lc1
    | ObjectType.lc2
    | ObjectType.lc3
    | ObjectType.lc4
    | ObjectType.lc5
    | ObjectType.lc6
    | ObjectType.lc7
    | ObjectType.lc8
    | ObjectType.dsrO
    | ObjectType.dsrX
    | ObjectType.dsrSquare
    | ObjectType.dsrTriangle;
  [key: number]: attachableObject & movableObject;
}

export interface WaymarkObject
  extends baseObject,
    imageObject,
    resizableObject,
    movableObject,
    colorableObject {
  shape: "square" | "circle";
  type:
    | ObjectType.way1
    | ObjectType.way2
    | ObjectType.way3
    | ObjectType.way4
    | ObjectType.wayA
    | ObjectType.wayB
    | ObjectType.wayC
    | ObjectType.wayD;
}

export interface aimableObject {
  targets: (Players | number | string)[];
}

export interface AttackObject extends baseObject, colorableObject {
  draw?: Function;
}

export interface CircleObject extends AttackObject, radiusObject {
  type: ObjectType.Circle;
  [key: number]: movableObject & aimableObject & attachableObject;
}

export interface ConeObject extends AttackObject, angleObject, radiusObject {
  type: ObjectType.Cone;
  [key: number]: movableObject &
    rotatableObject &
    attachableObject &
    aimableObject;
}

export interface RectangleObject extends AttackObject, resizableObject {
  type: ObjectType.Rect;
  rotAt: "middle" | "bottom";
  [key: number]: movableObject &
    rotatableObject &
    attachableObject &
    aimableObject;
}

export interface EnemyObject extends baseObject, imageObject {
  type: ObjectType.Enemy | ObjectType.Boss;
  [key: number]: movableObject & resizableObject & rotatableObject;
}

export interface Players extends baseObject, imageObject {
  type:
    | ObjectType.Player
    | ObjectType.tank
    | ObjectType.healer
    | ObjectType.melee
    | ObjectType.ranged
    | ObjectType.caster
    | ObjectType.pld
    | ObjectType.war
    | ObjectType.drk
    | ObjectType.gnb
    | ObjectType.whm
    | ObjectType.sch
    | ObjectType.ast
    | ObjectType.sge
    | ObjectType.mnk
    | ObjectType.drg
    | ObjectType.nin
    | ObjectType.sam
    | ObjectType.rpr
    | ObjectType.brd
    | ObjectType.mch
    | ObjectType.dnc
    | ObjectType.blm
    | ObjectType.rdm
    | ObjectType.smn
    | ObjectType.blu;
  [key: number]: movableObject & resizableObject & rotatableObject;
}

export type Attacc = CircleObject | ConeObject | RectangleObject;
export type PossibleParentObject = Players | EnemyObject;
export type AnObject =
  | Players
  | EnemyObject
  | Attacc
  | WaymarkObject
  | ToppingObject;

function makeObjectTests<T extends AnObject>(
  ...types: readonly ObjectType[]
): (object: AnObject) => object is T {
  return (object): object is T => types.includes(object.type);
}

export const isPlayers = makeObjectTests<Players>(
  ObjectType.Player,
  ObjectType.tank,
  ObjectType.healer,
  ObjectType.melee,
  ObjectType.ranged,
  ObjectType.caster,
  ObjectType.pld,
  ObjectType.war,
  ObjectType.drk,
  ObjectType.gnb,
  ObjectType.whm,
  ObjectType.sch,
  ObjectType.ast,
  ObjectType.sge,
  ObjectType.mnk,
  ObjectType.drg,
  ObjectType.nin,
  ObjectType.sam,
  ObjectType.rpr,
  ObjectType.brd,
  ObjectType.mch,
  ObjectType.dnc,
  ObjectType.blm,
  ObjectType.rdm,
  ObjectType.smn,
  ObjectType.blu
);

export const isTanks = makeObjectTests<Players>(
  ObjectType.tank,
  ObjectType.pld,
  ObjectType.war,
  ObjectType.drk,
  ObjectType.gnb
);

export const isHealers = makeObjectTests<Players>(
  ObjectType.healer,
  ObjectType.whm,
  ObjectType.sch,
  ObjectType.ast,
  ObjectType.sge
);

export const isDpss = makeObjectTests<Players>(
  ObjectType.melee,
  ObjectType.ranged,
  ObjectType.caster,
  ObjectType.mnk,
  ObjectType.drg,
  ObjectType.nin,
  ObjectType.sam,
  ObjectType.rpr,
  ObjectType.brd,
  ObjectType.mch,
  ObjectType.dnc,
  ObjectType.blm,
  ObjectType.rdm,
  ObjectType.smn,
  ObjectType.blu
);

export const isEnemys = makeObjectTests<EnemyObject>(
  ObjectType.Enemy,
  ObjectType.Boss
);
export const isWaymarks = makeObjectTests<WaymarkObject>(
  ObjectType.way1,
  ObjectType.way2,
  ObjectType.way3,
  ObjectType.way4,
  ObjectType.wayA,
  ObjectType.wayB,
  ObjectType.wayC,
  ObjectType.wayD
);

export const isToppings = makeObjectTests<ToppingObject>(
  ObjectType.lc1,
  ObjectType.lc2,
  ObjectType.lc3,
  ObjectType.lc4,
  ObjectType.lc5,
  ObjectType.lc6,
  ObjectType.lc7,
  ObjectType.lc8,
  ObjectType.dsrO,
  ObjectType.dsrX,
  ObjectType.dsrSquare,
  ObjectType.dsrTriangle
);
export const isPossibleParent = (obj: AnObject) => {
  return isPlayers(obj) || isEnemys(obj);
};
export const isCircle = makeObjectTests<CircleObject>(ObjectType.Circle);
export const isCone = makeObjectTests<ConeObject>(ObjectType.Cone);
export const isRectangle = makeObjectTests<RectangleObject>(ObjectType.Rect);
export const isAttacks = makeObjectTests<Attacc>(
  ObjectType.Circle,
  ObjectType.Cone,
  ObjectType.Rect
);
