import { useState } from "react";
import { MapType } from "../../Canvases/maptype";

interface ShapeProps {
  arena: MapType;
  setArena: Function;
}

export default function ShapeSelector({ arena, setArena }: ShapeProps) {
  const handleCircleClick = () => {
    setArena({ ...arena, shape: "circle" });
  };

  const handleSquareClick = () => {
    setArena({ ...arena, shape: "square" });
  };

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          border: `1px solid ${
            arena.shape === "circle" ? "#0080ff" : "transparent"
          }`,
          cursor: "pointer",
          borderRadius: "10% 0 0 10%",
          backgroundColor: "var(--darker)",
        }}
        onClick={handleCircleClick}
      >
        <div
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: `1px solid ${
              arena.shape === "circle" ? "#0080ff" : "white"
            }`,
            margin: "1px",
            display: "inline-block",
          }}
        />
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          border: `1px solid ${
            arena.shape === "square" ? "#0080ff" : "transparent"
          }`,
          borderRadius: "0 10% 10% 0",
          backgroundColor: "var(--darker)",
          cursor: "pointer",
        }}
        onClick={handleSquareClick}
      >
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "transparent",
            border: `1px solid ${
              arena.shape === "square" ? "#0080ff" : "white"
            }`,

            display: "inline-block",
          }}
        />
      </div>
    </div>
  );
}
