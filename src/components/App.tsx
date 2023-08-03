"use client";
import styles from "./header.module.css";

import { useState, createContext, useEffect, useRef } from "react";
import React from "react";

import Header from "./Header";
import IconBar from "./IconBar/IconBar";
import PropertyDisplay from "./PropertyDisplays/PropertyDisplay";
import PlanningCanvas from "./Canvases/PlanningCanvas";
import ElementDisplay from "./ElementsDisplay/ElementDisplay";
import ThemeToggle from "./ThemeToggle";

import { CounterProvider } from "../IdProvider";
import StepList from "./StepBar/StepList";
import { AnObject, isAttacks, isToppings } from "../types";
import { MapType } from "./Canvases/maptype";
import ArenaCanvas from "./Canvases/ArenaCanvas";

export const StepContext = createContext<number>(0);

interface Props {
  initItems: AnObject[];
  initSteps: number[];
  idStart: number;
  savePlan?: Function;
}

function App({ initItems, initSteps, idStart, savePlan }: Props) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [allItems, setAllItems] = useState(initItems);
  const [selectedElement, setSelectedElement] = useState<AnObject | null>(null);
  const stepList = useRef(initSteps);

  const [arena, setArena] = useState<MapType>({
    type: "map",
    shape: "square",
    padding: 80,
    color: "#ff8000",
    height: 500,
    width: 500,
    spokes: 0,
    rotation: 0,
    radials: 0,
    rows: 4,
    cols: 4,
  });

  const updateSelectedStep = (newStep: number, added: boolean) => {
    if (added) {
      allItems.forEach((item) => {
        if (item[selectedStep]) {
          item[newStep] = { ...item[selectedStep] };
        }
      });
    }
    setSelectedStep(newStep);
  };

  const updateAllItems = (newItems: AnObject[]) => {
    setAllItems(newItems);
  };

  const update = () => {
    setAllItems([...allItems]);
  };

  const searchAndDestroyAtCurrentStep = (element: AnObject) => {
    allItems.forEach((item) => {
      if (isAttacks(item) || isToppings(item)) {
        if (item[selectedStep]) {
          if (item[selectedStep].parents.length > 0) {
            item[selectedStep].parents.forEach((parent, index) => {
              if (parent.id === element.id) {
                item[selectedStep].parents.splice(index, 1);
              }
            });
          }
        }
      }
      if (isAttacks(item)) {
        if (item[selectedStep]) {
          if (item[selectedStep].targets.length > 0) {
            item[selectedStep].targets.forEach((child, index) => {
              if (!(typeof child === "number" || typeof child === "string")) {
                if (child.id === element.id) {
                  item[selectedStep].targets.splice(index, 1);
                }
              }
            });
          }
        }
      }
    });
  };

  const searchAndDestroy = (element: AnObject) => {
    allItems.forEach((item) => {
      if (isAttacks(item) || isToppings(item)) {
        Object.keys(item).forEach((key) => {
          const keyNum = parseInt(key);
          if (!isNaN(keyNum)) {
            if (item[keyNum].parents.length > 0) {
              item[keyNum].parents.forEach((parent: any, index: any) => {
                if (parent.id === element.id) {
                  item[keyNum].parents.splice(index, 1);
                }
              });
            }
          }
        });
      }
      if (isAttacks(item)) {
        Object.keys(item).forEach((key) => {
          const keyNum = parseInt(key);
          if (!isNaN(keyNum)) {
            if (item[keyNum].targets.length > 0) {
              item[keyNum].targets.forEach((child: any, index: any) => {
                if (!(typeof child === "number" || typeof child === "string")) {
                  if (child.id === element.id) {
                    item[keyNum].targets.splice(index, 1);
                  }
                }
              });
            }
          }
        });
      }
    });
  };

  const deleteElementEntirely = (element: AnObject) => {
    const index = allItems.indexOf(element);
    if (index > -1) {
      allItems.splice(index, 1);
    }
    searchAndDestroy(element);
    setSelectedElement(null);
    updateAllItems([...allItems]);
  };

  const deleteElementFromStep = (element: AnObject) => {
    searchAndDestroyAtCurrentStep(element);
    delete element[selectedStep];
    setSelectedElement(null);
    updateAllItems([...allItems]);
  };

  const savePlannerState = () => {
    const startId =
      allItems.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      }).id + 1;
    const steps = stepList.current;
    const dataToSave = { startId, steps, allItems };
    const data = JSON.stringify(dataToSave);
    if (savePlan) {
      savePlan(data);
    }
    localStorage.setItem("plannerState", data);
  };

  return (
    <div
      className={styles.App}
      style={{
        backgroundColor: "var(--dark)",
        userSelect: "none",
      }}
    >
      <CounterProvider initialCounter={idStart}>
        <StepContext.Provider value={selectedStep}>
          <Header className={styles.header}>
            <ThemeToggle />
            <button
              onClick={() => {
                savePlannerState();
              }}
            >
              Save
            </button>
          </Header>
          <StepList
            selectStep={updateSelectedStep}
            initSteps={initSteps}
            stepList={stepList}
          />
          <IconBar />
          <div
            className={styles.canvasarea}
            style={{
              backgroundColor: "var(--darker)",
            }}
          >
            <div className={styles.centercanvas}>
              <PlanningCanvas
                allElements={allItems}
                setAllElements={setAllItems}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                arena={arena}
              />

              <ArenaCanvas arena={arena} />
            </div>
          </div>
          <ElementDisplay
            allElements={allItems}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            deleteElementEntirely={deleteElementEntirely}
            deleteFromStep={deleteElementFromStep}
          />
          <PropertyDisplay
            updateSelected={update}
            allElements={allItems}
            selectedElement={selectedElement === null ? arena : selectedElement}
            updateAllElements={updateAllItems}
            setArena={setArena}
          />
        </StepContext.Provider>
      </CounterProvider>
    </div>
  );
}

export default App;
