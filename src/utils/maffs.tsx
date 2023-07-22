import {
  AnObject,
  isEnemys,
  isPlayers,
  isRectangle,
  isToppings,
  isWaymarks,
  isCone,
  isCircle,
} from "../types";

interface Point {
  x: number;
  y: number;
}

export const gcd = (a: number, b: number): number => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

export const lcm = (a: number, b: number) => {
  return (a * b) / gcd(a, b);
};

export const calcDistance = (a: Point, b: Point): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

export function calculateAngle(A: Point, B: Point, Z: Point): number {
  const sideA = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
  const sideB = Math.sqrt((Z.x - B.x) ** 2 + (Z.y - B.y) ** 2);
  const sideC = Math.sqrt((A.x - Z.x) ** 2 + (A.y - Z.y) ** 2);

  const angleRadians = Math.acos(
    (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)
  );

  let angleDegrees = angleRadians * (180 / Math.PI);

  // Adjust the angle to cover the full 360 degrees range
  const crossProduct = (A.x - B.x) * (Z.y - B.y) - (A.y - B.y) * (Z.x - B.x);
  if (crossProduct < 0) {
    angleDegrees = 360 - angleDegrees;
  }

  return -angleDegrees;
}

export const calcPointForAngle = (
  angle: number,
  rotPoint: Point,
  mouse: Point
): Point => {
  const dx = mouse.x - rotPoint.x;
  const dy = mouse.y - rotPoint.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const rad = Math.atan2(dy, dx) + angle;
  return {
    x: rotPoint.x + dist * Math.cos(rad),
    y: rotPoint.y + dist * Math.sin(rad),
  };
};

export const isStepItemHit = (
  mouse: Point,
  obj: AnObject,
  step: number
): boolean => {
  const rot =
    isWaymarks(obj) || isToppings(obj) || isCircle(obj)
      ? 0
      : obj[step].rotation;
  const pos = isWaymarks(obj) ? obj.pos : obj[step].pos;
  const adjustedPoint = calcPointForAngle((rot * Math.PI) / 180, pos, mouse);
  if (isToppings(obj) || isRectangle(obj)) {
    return (
      adjustedPoint.x >= obj[step].pos.x - obj.size.x / 2 &&
      adjustedPoint.x <= obj[step].pos.x + obj.size.x / 2 &&
      adjustedPoint.y >= obj[step].pos.y - obj.size.y / 2 &&
      adjustedPoint.y <= obj[step].pos.y + obj.size.y / 2
    );
  } else if (isWaymarks(obj)) {
    return (
      adjustedPoint.x >= obj.pos.x - obj.size.x / 2 &&
      adjustedPoint.x <= obj.pos.x + obj.size.x / 2 &&
      adjustedPoint.y >= obj.pos.y - obj.size.y / 2 &&
      adjustedPoint.y <= obj.pos.y + obj.size.y / 2
    );
  } else if (isPlayers(obj) || isEnemys(obj)) {
    const values = obj[step];
    return (
      adjustedPoint.x >= values.pos.x - values.size.x / 2 &&
      adjustedPoint.x <= values.pos.x + values.size.x / 2 &&
      adjustedPoint.y >= values.pos.y - values.size.y / 2 &&
      adjustedPoint.y <= values.pos.y + values.size.y / 2
    );
  } else if (isCone(obj)) {
    const angle = (obj.angle * Math.PI) / 180;
    const mouseAngle =
      calculateAngle(obj[step].pos, adjustedPoint, {
        x: obj[step].pos.x,
        y: obj[step].pos.y + 1,
      }) + 360;
    const startAngle = (360 - obj.angle / 2) * (Math.PI / 180);
    const endAngle = angle / 2;
    const mouseAngleRad = mouseAngle * (Math.PI / 180);

    return (
      calcDistance(adjustedPoint, obj[step].pos) <= obj.radius &&
      ((mouseAngleRad >= startAngle &&
        mouseAngleRad <= endAngle + Math.PI * 2) ||
        (mouseAngleRad >= startAngle - Math.PI * 2 &&
          mouseAngleRad <= endAngle))
    );
  } else if (isCircle(obj)) {
    return calcDistance(adjustedPoint, obj[step].pos) <= obj.radius;
  }
  return false;
};

export const orderChildren = (sceneChildren: AnObject[]) => {
  return sceneChildren.sort((a: AnObject, b: AnObject) => {
    if (a.type < b.type) {
      return -1;
    } else if (a.type > b.type) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const reverseOrderChildren = (sceneChildren: AnObject[]) => {
  return sceneChildren.sort((a: AnObject, b: AnObject) => {
    if (a.type > b.type) {
      return -1;
    } else if (a.type < b.type) {
      return 1;
    } else {
      return 0;
    }
  });
};
