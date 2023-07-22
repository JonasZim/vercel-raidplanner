//import '../../styling/property.css';
import React from "react";

interface GridProps {
  rows: number;
  columns: number;
  id: number;
  onGridChange: Function;
  onGridDelete: Function;
}

export default function GridSettings(props: GridProps) {
  const onChange = ({
    rows = props.rows,
    columns = props.columns,
    coloring = [],
  }: {
    rows?: number;
    columns?: number;
    coloring?: [];
  }) => {
    props.onGridChange(props.id, { rows, columns, coloring });
  };

  return (
    <div>
      <label>Grid:</label>
      <input
        type="number"
        className="cr"
        defaultValue={props.columns}
        onChange={(event) => {
          onChange({ columns: Number(event.target.value) });
        }}
      />
      by:
      <input
        type="number"
        className="cr"
        defaultValue={props.rows}
        onChange={(event) => {
          onChange({ rows: Number(event.target.value) });
        }}
      />
      <button onClick={(e) => props.onGridDelete(props.id)}>-</button>
    </div>
  );
}
