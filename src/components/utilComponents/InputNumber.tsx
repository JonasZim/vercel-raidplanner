import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import React, { useEffect, useState } from "react";

interface CustomInputProps {
  step?: number;
  defaultValue?: number;
  width?: string;
  min?: number | undefined;
  onChange: (defaultValue: number) => void;
}

export default function InputNumber({
  step = 1,
  defaultValue = 0,
  onChange,
  width = "100px",
  min = undefined,
}: CustomInputProps) {
  const [value, setValue] = useState(defaultValue);

  const [incrementIntervalId, setIncrementIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const [decrementIntervalId, setDecrementIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  const handleIncrement = () => {
    setValue((prev) => prev + step);
  };

  const handleDecrement = () => {
    if (min !== undefined && value - step < min) return;
    setValue((prev) => prev - step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="custom-input" style={{ width: width }}>
      <input type="number" min={min} value={value} onChange={handleChange} />
      <div className="arrow-container">
        <div
          className="arrow up"
          onClick={handleIncrement}
          onMouseDown={() => {
            const intervalId = setInterval(handleIncrement, 150);
            setIncrementIntervalId(intervalId);
          }}
          onMouseUp={() => {
            if (incrementIntervalId) {
              clearInterval(incrementIntervalId);
              setIncrementIntervalId(null);
            }
          }}
          onMouseLeave={() => {
            if (incrementIntervalId) {
              clearInterval(incrementIntervalId);
              setIncrementIntervalId(null);
            }
          }}
        >
          <MdOutlineKeyboardArrowUp />
        </div>
        <div
          className="arrow down"
          onClick={handleDecrement}
          onMouseDown={() => {
            const intervalId = setInterval(handleDecrement, 150);
            setDecrementIntervalId(intervalId);
          }}
          onMouseUp={() => {
            if (decrementIntervalId) {
              clearInterval(decrementIntervalId);
              setDecrementIntervalId(null);
            }
          }}
          onMouseLeave={() => {
            if (decrementIntervalId) {
              clearInterval(decrementIntervalId);
              setDecrementIntervalId(null);
            }
          }}
        >
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}
