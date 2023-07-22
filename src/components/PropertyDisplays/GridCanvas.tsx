import { useRef } from "react";
import React from "react";

export default function GridPropertyCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { grid, map, colorMap, index, ...rest } = props;
  const { radials, square } = map;

  const draw = () => {
    const canvas = canvasRef.current;
    let context: any;
    if (canvas !== null) {
      context = canvas.getContext("2d");
      canvas.width = canvas.height = 500;
      canvas.style.width = canvas.style.height = "250px";
    }
    if (context && canvas) {
      context.fillStyle = "rgb(102, 102, 102)";
      if (square) {
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      } else {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 250, 0, 2 * Math.PI);
        context.fill();
      }

      if (square) {
        const rowWidth = 500 / grid.rows;
        const columnWidth = 500 / grid.columns;

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
          c = 250;
          b = i * (canvas.width / grid.columns) - 250;
          a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
          context.beginPath();
          context.moveTo(i * (canvas.width / grid.columns), 250 - a);
          context.lineTo(i * (canvas.width / grid.columns), 500 - (250 - a));
          context.strokeStyle = "#d7d7d7";
          context.stroke();
        }

        for (let i = 0; i <= grid.rows; i++) {
          let a, b, c;
          c = 250;
          b = i * (canvas.width / grid.rows) - 250;
          a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
          context.beginPath();
          context.moveTo(250 - a, i * (canvas.height / grid.rows));
          context.lineTo(500 - (250 - a), i * (canvas.height / grid.rows));
          context.strokeStyle = "#d7d7d7";
          context.stroke();
        }
      }

      for (let i = 0; i <= radials; i++) {
        context.beginPath();
        context.arc(
          canvas.width / 2,
          canvas.height / 2,
          250 - i * (250 / radials),
          0,
          2 * Math.PI
        );
        context.strokeStyle = "#d7d7d7";
        context.stroke();
      }
    }
  };

  draw();

  const onMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coloredRow = Math.ceil(e.nativeEvent.offsetY / (250 / grid.rows));
    const coloredColumn = Math.ceil(
      e.nativeEvent.offsetX / (250 / grid.columns)
    );
    const gridPos = (coloredRow - 1) * grid.columns + coloredColumn - 1;
    grid.coloring[gridPos] = !grid.coloring[gridPos];
    colorMap(index, grid);
  };

  return (
    <canvas
      className="map-canvas"
      ref={canvasRef}
      {...rest}
      onMouseDown={(e) => onMouseClick(e)}
    />
  );
}
