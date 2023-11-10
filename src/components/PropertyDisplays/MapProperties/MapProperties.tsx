//import '../../styling/property.css';

import React from "react";
import { MapType } from "../../Canvases/maptype";
import ShapeSelector from "./MapShapeSelector";
import InputNumber from "../../utilComponents/InputNumber";

interface MProps {
  arena: MapType;
  setArena: Function;
}

export default function MapProperties({ arena, setArena }: MProps) {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Arena Shape</label>
            <ShapeSelector arena={arena} setArena={setArena} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <label>Padding</label>
            <InputNumber
              step={10}
              defaultValue={arena.padding}
              onChange={(value: number) =>
                setArena({ ...arena, padding: value })
              }
            />
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Height</label>
            <InputNumber
              step={25}
              width="120px"
              defaultValue={arena.height}
              onChange={(value: number) =>
                setArena({ ...arena, height: value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Width</label>
            <InputNumber
              width="120px"
              step={25}
              defaultValue={arena.width}
              onChange={(value: number) => setArena({ ...arena, width: value })}
            />
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Rows</label>
            <InputNumber
              width="120px"
              defaultValue={arena.rows}
              onChange={(value: number) => setArena({ ...arena, rows: value })}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Columns</label>
            <InputNumber
              width="120px"
              defaultValue={arena.cols}
              onChange={(value: number) => setArena({ ...arena, cols: value })}
            />
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Spokes</label>
            <InputNumber
              width="120px"
              defaultValue={arena.spokes}
              onChange={(value: number) =>
                setArena({ ...arena, spokes: value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Spoke Rotation</label>
            <InputNumber
              width="120px"
              step={5}
              defaultValue={arena.rotation}
              onChange={(value: number) =>
                setArena({ ...arena, rotation: value })
              }
            />
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label>Radials</label>
            <InputNumber
              width="250px"
              defaultValue={arena.radials}
              onChange={(value: number) =>
                setArena({ ...arena, radials: value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
