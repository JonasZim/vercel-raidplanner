import { useState } from "react";
import {
  AnObject,
  isCircle,
  isCone,
  isRectangle,
  isToppings,
  isWaymarks,
} from "../../types";
import React from "react";
import Image from "next/image";

import styles from "./elementdisplay.module.css";

type DisplayTypeProps = {
  arr: AnObject[];
  type: string;
  selected: AnObject | null;
  setSelected: Function;
  deleteElement: Function;
  deleteFromStep: Function;
};

export default function DisplayType({
  arr,
  type,
  selected,
  setSelected,
  deleteElement,
  deleteFromStep,
}: DisplayTypeProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = (element: AnObject) => {
    setSelected(element === selected ? null : element);
  };

  function rgbToHex(rgb: string): string {
    const values = rgb.split(",").map((value) => parseInt(value.trim(), 10));
    const [r, g, b] = values;

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
      return `#${hex}`;
    }

    return "";
  }

  const getRepresantive = (element: AnObject) => {
    if (isCircle(element)) {
      return (
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: rgbToHex(element.color),
          }}
        ></div>
      );
    } else if (isCone(element)) {
      return (
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: "30px solid " + rgbToHex(element.color),
            borderRadius: "20px",
          }}
        ></div>
      );
    } else if (isRectangle(element)) {
      const widthRatio = (30 * element.size.x) / element.size.y;
      const margin = (30 - widthRatio) / 2 + 5;
      return (
        <div
          style={{
            marginTop: "5",
            marginBottom: "5",
            marginLeft: margin + "px",
            marginRight: margin + "px",
            backgroundColor: rgbToHex(element.color),
            height: "30px",
            width: widthRatio + "px",
          }}
        ></div>
      );
    } else {
      return (
        <Image
          src={element.iconString}
          alt={element.label}
          width={30}
          height={30}
        />
      );
    }
  };

  return (
    <div
      style={{
        //border: "1px solid var(--dark)",
        width: "99%",
        //marginBottom: "10px",
      }}
    >
      <div
        onClick={toggleExpansion}
        style={{
          cursor: "pointer",
          backgroundColor: "var(--darkest)",
          padding: "5px",
          fontWeight: "bold",
          //borderBottom: "1px solid var(--dark)",
        }}
      >
        {type} {isExpanded ? "▼" : "►"}
      </div>
      {isExpanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--darker)",
          }}
        >
          {arr.map((element: AnObject) => {
            const isSelected = element === selected;
            const backgroundColor = isSelected ? "yellow" : "inherit";
            const color = isSelected ? "black" : "inherit";
            return (
              <div
                className={styles.element}
                key={element.id}
                onClick={() => handleClick(element)}
                style={{
                  backgroundColor,
                  color,
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "5px",
                  borderBottom: "1px solid var(--dark)",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {getRepresantive(element)}
                  {element.label}
                </div>
                <div
                  style={{ display: "flex", gap: "10px", paddingRight: "30px" }}
                >
                  {!isWaymarks(element) && !isToppings(element) && (
                    <div
                      style={{ float: "right" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFromStep(element);
                        setSelected(null);
                      }}
                    >
                      🥷🏼
                    </div>
                  )}
                  <div
                    style={{ float: "right" }}
                    onClick={(e) => {
                      deleteElement(element);
                      e.stopPropagation();
                    }}
                  >
                    🗑
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
