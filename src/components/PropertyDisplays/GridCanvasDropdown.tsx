import React, { useState } from 'react';

export interface DropdownProps {
  label: string;
  grids: any[];
  setNumber: Function;
}

export default function Dropdown ({ label, grids, setNumber }: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(parseInt(event.target.value));
    setNumber(parseInt(event.target.value));
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selectedValue ?? ''} onChange={handleChange}>
        {grids.map((grid, index) => (
          <option key={index} value={index}>
            {index+1}
          </option>
        ))}
      </select>
    </div>
  );
};