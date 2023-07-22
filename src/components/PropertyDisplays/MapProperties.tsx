//import '../../styling/property.css';

import MapModel, { Grid } from "../../models/MapModel";
import React, { useState, useEffect } from "react";
import GridSettings from "./GridProperty";
import GridDropdown from "./GridCanvasDropdown";
import GridPropertyCanvas from "./GridCanvas";

interface MProps {
  map: MapModel;
  changeMap: Function;
}

export default function MapProperties({ map, changeMap }: MProps) {
  const [square, setSquare] = useState(map.square);
  const [grids, setGrids] = useState(map.grids);
  const [radials, setRadials] = useState(map.radials);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    changeMap(new MapModel({ square: square, radials: radials, grids: grids }));
  }, [square, changeMap, grids, radials]);

  const changeGridAt = (index: number, newGrid: Grid) => {
    grids[index] = { ...newGrid };
    setGrids([...map.grids]);
  };

  const newGrid = () => {
    grids[grids.length] = { rows: 4, columns: 4, coloring: [] };
    setGrids([...map.grids]);
  };

  const deleteGrid = (index: number) => {
    grids.splice(index, 1);
    setGrids([...map.grids]);
  };

  const gridDisplay = () => {
    const GridJSX = map.grids.map((grid, index) => {
      return (
        <GridSettings
          rows={grid.rows}
          columns={grid.columns}
          id={index}
          key={index}
          onGridChange={changeGridAt}
          onGridDelete={deleteGrid}
        />
      );
    });
    return GridJSX;
  };

  return (
    <div>
      {gridDisplay()}
      <button onClick={newGrid}>+</button>
      <div>
        <label>Rad:</label>
        <input
          type="number"
          className="cr"
          defaultValue={map.radials}
          onChange={(event) => setRadials(Number(event.target.value))}
        />
      </div>
      <div>
        <label>Circle or Square</label>
        <input
          type="checkbox"
          checked={map.square}
          onChange={(event) => setSquare(!square)}
        />
      </div>
      <div>
        <GridDropdown
          label="Select Grid"
          grids={grids}
          setNumber={setSelected}
        />
      </div>
      <div>
        <GridPropertyCanvas
          colorMap={changeGridAt}
          index={selected}
          grid={grids[selected]}
          map={map}
          key={grids}
        />
      </div>
    </div>
  );
}
