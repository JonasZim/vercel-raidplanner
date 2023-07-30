import React, { useEffect, useState } from "react";

interface InputTextProps {
  defaultValue?: string;
  width?: string;
  onChange: (defaultValue: string) => void;
}

export default function InputText({
  defaultValue = "",
  onChange,
  width = "100px",
}: InputTextProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <input
      className="custom-input"
      style={{
        width: width,
        textAlign: "left",
        paddingLeft: "8px",
        height: "28px",
      }}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
