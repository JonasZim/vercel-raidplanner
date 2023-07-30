import { Point } from "../../types";

export interface MapType {
  type: "map";
  shape: "circle" | "square";
  padding: number;
  color: string;
  height: number;
  width: number;
  spokes: number;
  rotation: number;
  radials: number;
  rows: number;
  cols: number;
  backgroundImage?: string;
}

export const defaultMap: MapType = {
  type: "map",
  shape: "square",
  padding: 120,
  color: "#333333",
  height: 700,
  width: 700,
  spokes: 0,
  rotation: 0,
  radials: 0,
  rows: 4,
  cols: 4,
  backgroundImage: undefined,
};

export const isMap = (map: any): map is MapType => {
  return map.type === "map";
};
