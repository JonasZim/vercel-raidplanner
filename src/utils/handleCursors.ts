import { handleTypes } from "./drawing/drawHandles";

export const changeCursorOverHandle = (
  handleType: keyof typeof handleTypes,
  rot: number
) => {
  if (handleType === "rotation") {
    document.body.style.cursor = "progress";
    return;
  }

  if (handleType === "center") {
    document.body.style.cursor = "row-resize";
    return;
  }

  if (handleType === "angleR" || handleType === "angleL") {
    document.body.style.cursor = "ew-resize";
    return;
  }

  const rotOffset = getDegreesForDirection(rot);
  const typeOffset = Object.keys(handleTypes).indexOf(handleType);
  const offset = rotOffset + typeOffset;

  const cursors = [
    "n-resize",
    "ne-resize",
    "e-resize",
    "se-resize",
    "s-resize",
    "sw-resize",
    "w-resize",
    "nw-resize",
  ];
  document.body.style.cursor = cursors[offset];
};

const getDegreesForDirection = (rot: number): number => {
  if (337.5 < rot || rot <= 22.5) return 0;
  if (22.5 < rot && rot <= 67.5) return 1;
  if (67.5 < rot && rot <= 112.5) return 2;
  if (112.5 < rot && rot <= 157.5) return 3;
  if (157.5 < rot && rot <= 202.5) return 4;
  if (202.5 < rot && rot <= 247.5) return 5;
  if (247.5 < rot && rot <= 292.5) return 6;
  if (292.5 < rot && rot <= 337.5) return 7;
  return 0;
};
