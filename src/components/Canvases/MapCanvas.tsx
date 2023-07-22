import styles from "./canvases.module.css";

import { useRef } from "react";
import React from "react";

export default function MapCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { map, setMap, ...rest } = props;

  const draw = () => {
    const canvas = canvasRef.current;
    let context: any;
    if (canvas !== null) {
      context = canvas.getContext("2d");
      canvas.width = canvas.height = 1000;
      canvas.style.width = canvas.style.height = "500px";
    }
    if (context && canvas) {
      context.fillStyle = "rgb(102, 102, 102)";
      if (map.square) {
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      } else {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 500, 0, 2 * Math.PI);
        context.fill();
      }

      map.grids.forEach((grid: any) => {
        if (map.square) {
          const rowWidth = 1000 / grid.rows;
          const columnWidth = 1000 / grid.columns;

          for (let i = 0; i < grid.rows; i++) {
            for (let k = 0; k < grid.columns; k++) {
              if (grid.coloring[i * grid.columns + k]) {
                context.fillStyle = "red";
                context.fillRect(
                  columnWidth * k,
                  rowWidth * i,
                  columnWidth,
                  rowWidth
                );
              }
            }
          }

          for (let i = 0; i <= grid.columns; i++) {
            context.beginPath();
            context.moveTo(i * (canvas.width / grid.columns), 0);
            context.lineTo(i * (canvas.width / grid.columns), canvas.height);
            context.strokeStyle = "#d7d7d7";
            context.stroke();
          }

          for (let i = 0; i <= grid.rows; i++) {
            context.beginPath();
            context.moveTo(0, i * (canvas.height / grid.rows));
            context.lineTo(canvas.width, i * (canvas.height / grid.rows));
            context.strokeStyle = "#d7d7d7";
            context.stroke();
          }
        } else {
          for (let i = 0; i <= grid.columns; i++) {
            let a, b, c;
            c = 500;
            b = i * (canvas.width / grid.columns) - 500;
            a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
            context.beginPath();
            context.moveTo(i * (canvas.width / grid.columns), 500 - a);
            context.lineTo(i * (canvas.width / grid.columns), 1000 - (500 - a));
            context.strokeStyle = "#d7d7d7";
            context.stroke();
          }

          for (let i = 0; i <= grid.rows; i++) {
            let a, b, c;
            c = 500;
            b = i * (canvas.width / grid.rows) - 500;
            a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
            context.beginPath();
            context.moveTo(500 - a, i * (canvas.height / grid.rows));
            context.lineTo(1000 - (500 - a), i * (canvas.height / grid.rows));
            context.strokeStyle = "#d7d7d7";
            context.stroke();
          }
        }
        for (let i = 0; i <= map.radials; i++) {
          context.beginPath();
          context.arc(
            canvas.width / 2,
            canvas.height / 2,
            500 - i * (500 / map.radials),
            0,
            2 * Math.PI
          );
          context.strokeStyle = "#d7d7d7";
          context.stroke();
        }
      });
    }
  };

  draw();

  return <canvas className={styles.mapcanvas} ref={canvasRef} {...rest} />;
}
