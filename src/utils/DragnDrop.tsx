import { ObjectType } from "../types";

export const onDrag = (
  event: React.DragEvent<HTMLDivElement>,
  offset: Point,
  type: ObjectType
) => {
  event.dataTransfer.setData("offset", JSON.stringify(offset));
  event.dataTransfer.setData("type", type);
};

export const onDrop = (
  event: React.DragEvent<HTMLCanvasElement>
): [ObjectType, Point] | undefined => {
  event.preventDefault();
  const offsetString = event.dataTransfer.getData("offset");
  const data = event.dataTransfer.getData("type");

  if (data && offsetString) {
    const type = data as ObjectType;
    const offset: Point = JSON.parse(offsetString) as Point;
    return [type, offset];
  }

  return undefined;
};

export const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export const calcOffset = (
  event: React.DragEvent<HTMLDivElement>,
  icon: HTMLImageElement
): Point => {
  const rect = icon.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};

export enum DragIconType {
  Waymark = "waymark",
  Player = "player",
  Enemy = "enemy",
  Object = "object",
  Attack = "attack",
}

interface Point {
  x: number;
  y: number;
}
