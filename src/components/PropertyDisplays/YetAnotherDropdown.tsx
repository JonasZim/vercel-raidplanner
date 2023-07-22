import React, { useState, useRef, useEffect } from "react";
import { AttackObject, ToppingObject, PossibleParentObject } from "../../types";
import { StepContext } from "../App";
import { useContext } from "react";

interface DropdownProps {
  nonObject: AttackObject | ToppingObject;
  objects: PossibleParentObject[];
  updateValues: Function;
}

const Dropdown: React.FC<DropdownProps> = ({
  objects,
  nonObject,
  updateValues,
}) => {
  const step = useContext(StepContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    nonObject[step].parents.map((parent: PossibleParentObject) =>
      parent.id.toString()
    )
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleOptionClick = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    updateValues(updatedSelectedValues);

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <div style={{ position: "relative", minWidth: "100px" }} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        style={{
          marginBottom: "8px",
          backgroundColor: "var(--dark)",
          color: "var(--text-color)",
        }}
      >
        Attack From:
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            borderRadius: "4px",
            padding: "8px",
            zIndex: 100,
            backgroundColor: "var(--dark)",
          }}
        >
          {objects.map((object: PossibleParentObject) => (
            <label
              key={object.id}
              style={{ display: "block", marginBottom: "4px" }}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(object.id.toString())}
                onChange={() => handleOptionClick(object.id.toString())}
              />
              {object.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
