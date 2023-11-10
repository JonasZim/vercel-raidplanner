import { Point } from "../types";
import { handleTypes } from "./drawing/drawHandles";

abstract class Handle {
  constructor(
    public x: number,
    public y: number,
    public rot: number //public type: keyof typeof handleTypes
  ) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    //this.type = type;
  }

  abstract onDrag(mousePos: Point): void;
}

class NWHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class SWHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class NEHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class SEHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class NHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class WHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class EHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class SHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}

class RotHandle extends Handle {
  constructor(x: number, y: number, rot: number) {
    super(x, y, rot);
  }

  onDrag(mousePos: Point): void {
    throw new Error("Method not implemented.");
  }
}
