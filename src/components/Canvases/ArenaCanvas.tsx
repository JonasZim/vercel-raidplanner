import styles from "./canvases.module.css";

import { useEffect, useRef } from "react";
import React from "react";

export default function ArenaCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { arena, ...rest } = props;

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const rowHeight = arena.height / arena.rows;
    const columnWidth = arena.width / arena.cols;
    for (let i = 1; i < arena.cols; i++) {
      if (arena.shape === "square") {
        ctx.beginPath();
        ctx.moveTo(i * columnWidth + arena.padding, arena.padding);
        ctx.lineTo(
          i * columnWidth + arena.padding,
          arena.height + arena.padding
        );
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      } else if (arena.shape === "circle") {
        let a, b, c;
        c = arena.height / 2;
        b = i * (arena.width / arena.cols) - arena.width / 2;
        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
        ctx.beginPath();
        ctx.moveTo(
          arena.padding + i * (arena.width / arena.cols),
          arena.height / 2 - a + arena.padding
        );
        ctx.lineTo(
          i * (arena.width / arena.cols) + arena.padding,
          arena.height - (arena.height / 2 - a) + arena.padding
        );
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      }
    }

    for (let i = 1; i < arena.rows; i++) {
      if (arena.shape === "square") {
        ctx.beginPath();
        ctx.moveTo(arena.padding, i * rowHeight + arena.padding);
        ctx.lineTo(arena.width + arena.padding, i * rowHeight + arena.padding);
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      } else if (arena.shape === "circle") {
        let a, b, c;
        c = arena.width / 2;
        b = i * (arena.height / arena.rows) - arena.height / 2;
        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
        ctx.beginPath();
        ctx.moveTo(
          arena.width / 2 - a + arena.padding,
          i * (arena.height / arena.rows) + arena.padding
        );
        ctx.lineTo(
          arena.width - (arena.width / 2 - a) + arena.padding,
          i * (arena.height / arena.rows) + arena.padding
        );
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      }
    }
  };

  const drawRadials = (ctx: CanvasRenderingContext2D) => {
    const centerX = arena.width / 2 + arena.padding;
    const centerY = arena.height / 2 + arena.padding;
    const radialWidth = arena.width / arena.radials / 2;
    const radialHeight = arena.height / arena.radials / 2;
    if (arena.radials === 0) return;
    if (arena.radials > 0) {
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        arena.width / 2,
        arena.height / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#6f5a48";
      ctx.stroke();
    }

    for (let i = 0; i < arena.radials; i++) {
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        radialWidth * i,
        radialHeight * i,
        0,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#6f5a48";
      ctx.stroke();
    }
  };

  const getRad = (angle: number) => {
    return (angle * Math.PI) / 180;
  };

  const getSpokeLength = (angle: number, sideLength: number) => {
    let length = 0;
    if (Math.floor((angle + getRad(45)) / getRad(90)) % 2 === 0) {
      length = sideLength / Math.cos(angle);
    } else {
      length = sideLength / Math.sin(angle);
    }
    return Math.abs(length);
  };

  const drawSpokes = (ctx: CanvasRenderingContext2D) => {
    const centerX = arena.width / 2 + arena.padding;
    const centerY = arena.height / 2 + arena.padding;
    const spokeDegrees = 360 / arena.spokes;
    const spokeAngle = ((spokeDegrees + arena.rotation - 90) * Math.PI) / 180;

    for (let i = 0; i < arena.spokes; i++) {
      if (arena.shape === "square") {
        const spokeWidth = getSpokeLength(
          spokeAngle + spokeDegrees * i * (Math.PI / 180),
          arena.width / 2
        );
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX +
            Math.cos(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              spokeWidth,
          centerY +
            Math.sin(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              spokeWidth
        );
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      } else if (arena.shape === "circle") {
        const spokeWidth =
          Math.abs(
            Math.cos(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              (arena.width / 2)
          ) +
          Math.abs(
            Math.sin(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              (arena.height / 2)
          );
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX +
            Math.cos(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              spokeWidth,
          centerY +
            Math.sin(spokeAngle + spokeDegrees * i * (Math.PI / 180)) *
              spokeWidth
        );
        ctx.strokeStyle = "#6f5a48";
        ctx.stroke();
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    canvas.height = arena.height * 2 + arena.padding * 4;
    canvas.width = arena.width * 2 + arena.padding * 4;
    canvas.style.height = `${arena.height + arena.padding * 2}px`;
    canvas.style.width = `${arena.width + arena.padding * 2}px`;
    if (arena.shape === "square") {
      ctx.save();
      ctx.scale(2, 2);
      ctx.clearRect(
        0,
        0,
        canvas.width + arena.padding,
        canvas.height + arena.padding
      );
      ctx.fillStyle = "#40352c";
      ctx.fillRect(arena.padding, arena.padding, arena.width, arena.height);
      ctx.strokeStyle = "#6f5a48";
      ctx.strokeRect(arena.padding, arena.padding, arena.width, arena.height);
      drawGrid(ctx);
      drawRadials(ctx);
      drawSpokes(ctx);
      ctx.restore();
    } else if (arena.shape === "circle") {
      ctx.save();
      ctx.scale(2, 2);
      ctx.clearRect(
        0,
        0,
        canvas.width + arena.padding,
        canvas.height + arena.padding
      );
      ctx.fillStyle = "#40352c";
      ctx.beginPath();
      ctx.ellipse(
        arena.width / 2 + arena.padding,
        arena.height / 2 + arena.padding,
        arena.width / 2,
        arena.height / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.strokeStyle = "#6f5a48";
      ctx.stroke();
      drawGrid(ctx);
      drawRadials(ctx);
      drawSpokes(ctx);
      ctx.restore();
    }
  };

  draw();

  return <canvas className={styles.mapcanvas} ref={canvasRef} {...rest} />;
}
