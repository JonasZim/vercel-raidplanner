import {
  PossibleParentObject,
  AnObject,
  Attacc,
  isPossibleParent,
  isCircle,
  isCone,
  isRectangle,
} from "../../../types";
import RectAoeProperties from "./rectAoeProps";
import CircleAoeProperties from "./circleAoeProps";
import ConeAoeProperties from "./coneAoeProps";
import ColorButton from "../ColorButtonPrefab";
import { valuesToInt, valuesMaybeToInt } from "../../../utils/utils";
import Dd2 from "../TestDropdown";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";
import InputNumber from "../../utilComponents/InputNumber";

import styles from "./attack.module.css";

interface Props {
  attack: Attacc;
  changingAttack: Function;
  allElements: AnObject[];
}

export default function AttackProperties({
  attack,
  changingAttack,
  allElements,
}: Props) {
  const step = useContext(StepContext);

  const getAllObjects = (): PossibleParentObject[] => {
    return allElements.filter((element) => {
      return isPossibleParent(element);
    }) as PossibleParentObject[];
  };

  const displayAttackSpecificProps = () => {
    if (isCircle(attack)) {
      return (
        <CircleAoeProperties attack={attack} changeAttack={changingAttack} />
      );
    } else if (isCone(attack)) {
      return (
        <ConeAoeProperties attack={attack} changeAttack={changingAttack} />
      );
    } else if (isRectangle(attack)) {
      return (
        <RectAoeProperties attack={attack} changeAttack={changingAttack} />
      );
    } else {
      return <div>Unknown</div>;
    }
  };

  function hexToRgb(hex: string) {
    // Remove the '#' character from the hex color code
    const cleanedHex = hex.replace("#", "");

    // Convert the cleaned hex value to RGB
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);

    return `${r},${g},${b}`;
  }

  function rgbToHex(rgb: string): string {
    const values = rgb.split(",").map((value) => parseInt(value.trim(), 10));
    const [r, g, b] = values;

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
      return `#${hex}`;
    }

    return "";
  }

  const getColorButtons = () => {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ffffff",
      "#000000",
      "#ff8000",
      "#8000ff",
      "#00ff80",
      "#ff0080",
      "#80ff00",
      "#0080ff",
    ];
    return colors.map((color) => {
      return (
        <ColorButton
          key={color}
          color={color}
          attack={attack}
          onChange={changingAttack}
          colorToRgb={hexToRgb}
        />
      );
    });
  };

  const mapParentsIdToString = () => {
    return attack[step].parents.map((parent) => {
      return parent.id.toString();
    });
  };

  const objectsToDropdown = () => {
    return getAllObjects().map((object) => {
      return { value: object.id.toString(), label: object.label };
    });
  };

  const onNewSource = (updatedValues: string[]) => {
    const parents = getAllObjects().filter((object) =>
      valuesToInt(updatedValues).includes(object.id)
    );
    attack[step].parents = parents;
    if (parents.length === 0) {
      attack[step].targets = [];
    }
    changingAttack();
  };

  const getTargetValues = () => {
    const values = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "dps",
      "healer",
      "tank",
      "support",
    ];
    return values.map((value) => {
      return { value: value, label: value };
    });
  };

  const onNewTarget = (updatedValues: string[]) => {
    attack[step].targets = valuesMaybeToInt(updatedValues);
    changingAttack();
  };

  const mapTargetsToString = () => {
    if (attack[step].targets) {
      return attack[step].targets.map((target) => {
        return target.toString();
      });
    } else {
      return [];
    }
  };

  return (
    <div>
      <div>
        <div className={styles.inputnumbercon}>
          <label className={styles.inputlabel}>Color:</label>
          <div className={styles.colordisplay}>
            <div
              style={{
                backgroundColor: rgbToHex(attack.color),
                display: "inline",
                width: 25,
              }}
            >
              <input
                className={styles.inputcolor}
                type="color"
                value={rgbToHex(attack.color)}
                onChange={(e) => {
                  const rgb = hexToRgb(e.target.value);
                  attack.color = rgb;
                  changingAttack();
                }}
              />
            </div>
            <input
              className={styles.inputcolortext}
              type="text"
              value={rgbToHex(attack.color)}
              onChange={(e) => {
                if (/#[0-9A-Fa-f]{6}/.test(e.target.value)) {
                  const rgb = hexToRgb(e.target.value);
                  attack.color = rgb;
                  changingAttack();
                }
              }}
            />
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              {getColorButtons()
                .slice(0, 7)
                .map((button, index) => {
                  return <td key={index}>{button}</td>;
                })}
            </tr>
            <tr>
              {getColorButtons()
                .slice(7, 14)
                .map((button, index) => {
                  return <td key={index}>{button}</td>;
                })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.inputnumbercon}>
        <label className={styles.inputlabel}>Opacity:</label>
        <div className={styles.opacityslider}>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={(attack.alpha * 100).toFixed(2)}
            onChange={(e) => {
              attack.alpha = parseInt(e.target.value, 10) / 100;
              changingAttack();
            }}
          />
          {(attack.alpha * 100).toFixed(0)}%
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
          <label>Pos X</label>
          <InputNumber
            width="120px"
            step={10}
            defaultValue={attack[step].pos.x}
            onChange={(value: number) => {
              attack[step].pos = { ...attack[step].pos, x: value };
              changingAttack();
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label>Pos Y</label>
          <InputNumber
            step={10}
            width="120px"
            defaultValue={attack[step].pos.y}
            onChange={(value: number) => {
              attack[step].pos = { ...attack[step].pos, y: value };
              changingAttack();
            }}
          />
        </div>
      </div>

      <br />

      {displayAttackSpecificProps()}

      <br />

      <Dd2
        objects={objectsToDropdown()}
        selection={mapParentsIdToString()}
        updateValues={onNewSource}
        dropdownLabel="Source: "
      />
      {attack[step].parents.length > 0 && (
        <Dd2
          objects={getTargetValues()}
          selection={mapTargetsToString()}
          updateValues={onNewTarget}
          dropdownLabel="Target: "
        />
      )}
    </div>
  );
}
