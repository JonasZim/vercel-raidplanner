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
    setValue((value) => value + step);
  };

  const handleDecrement = () => {
    setValue((value) => value - step);
  };

  const clickIncrement = () => {
    setValue(value + step);
  };

  const clickDecrement = () => {
    setValue(value - step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="custom-input" style={{ width: width }}>
      <input type="number" min={min} value={value} onChange={handleChange} />
      <div className="arrow-container">
        <div
          className="arrow up"
          onClick={clickIncrement}
          onMouseDown={() => {
            const intervalId = setInterval(handleIncrement, 200);
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
          onClick={clickDecrement}
          onMouseDown={() => {
            const intervalId = setInterval(handleDecrement, 200);
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
