import styles from "./canvases.module.css";
import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { onDrop } from "../../utils/DragnDrop";
import {
  AnObject,
  isAttacks,
  isPossibleParent,
  isToppings,
  isWaymarks,
} from "../../types";
import { drawAnObject, drawElementSelection } from "../../utils/drawUtils";
import { isStepItemHit } from "../../utils/maffs";
import { createAnObject } from "../../utils/utils";
import { useCounter } from "../../IdProvider";
import { StepContext } from "../App";

interface Point {
  x: number;
  y: number;
}

export default function PlanningCanvas(props: any) {
  const { counter, incrementCounter } = useCounter();
  const currentStep = useContext(StepContext);

  const {
    allElements,
    setAllElements,
    selectedElement,
    setSelectedElement,
    ...rest
  } = props;

  const [dragging, setDragging] = useState<Point | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepItems = useMemo(() => {
    return allElements.filter((element: AnObject) => {
      return element[currentStep] !== undefined || isWaymarks(element);
    });
  }, [allElements, currentStep]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        //canvas.width = canvas.height = 1000;
        //canvas.style.width = canvas.style.height = "500px";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stepItems.forEach((item: AnObject) => {
          drawAnObject(ctx, item, currentStep, stepItems);
        });
        if (selectedElement) {
          drawElementSelection(ctx, selectedElement, currentStep);
        }
      }
    }
  };

  const animate = () => {
    drawCanvas();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, [drawCanvas]);

  const calcPosOnCanvas = (
    offset: Point,
    e: React.MouseEvent | React.DragEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left - offset.x);
      const y = Math.round(e.clientY - rect.top - offset.y);
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const dropHandler = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const result = onDrop(e);
    if (result) {
      const topLeft = calcPosOnCanvas(result[1], e);
      const betterObj = createAnObject(
        result[0],
        currentStep,
        counter,
        topLeft
      );
      incrementCounter();
      setAllElements([...allElements, betterObj]);
    }
  };

  const onCanvasClicked = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      let childHit2 = false;
      stepItems.forEach((item: AnObject) => {
        let offset;
        if (isStepItemHit(pos, item, currentStep)) {
          if (isWaymarks(item)) {
            setSelectedElement(item);
            offset = {
              x: item.pos.x - e.clientX + rect.left,
              y: item.pos.y - e.clientY + rect.top,
            };
            setDragging(offset);
            childHit2 = true;
          } else if (isPossibleParent(item)) {
            setSelectedElement(item);
            offset = {
              x: item[currentStep].pos.x - e.clientX + rect.left,
              y: item[currentStep].pos.y - e.clientY + rect.top,
            };
            setDragging(offset);
            childHit2 = true;
          } else if (
            (isAttacks(item) || isToppings(item)) &&
            item[currentStep].parents.length === 0
          ) {
            setSelectedElement(item);
            offset = {
              x: item[currentStep].pos.x - e.clientX + rect.left,
              y: item[currentStep].pos.y - e.clientY + rect.top,
            };
            setDragging(offset);
            childHit2 = true;
          }
        }
      });
      if (!childHit2) {
        setSelectedElement(null);
      }
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        if (isWaymarks(selectedElement)) {
          selectedElement.pos = {
            x: pos.x + dragging.x,
            y: pos.y + dragging.y,
          };
        } else {
          selectedElement[currentStep].pos = {
            x: pos.x + dragging.x,
            y: pos.y + dragging.y,
          };
        }
        const newElements = [...allElements];
        setAllElements(newElements);
      }
    }

    const canvas = canvasRef.current;

    if (canvas) {
      let childHit = false;
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      stepItems.forEach((item: AnObject) => {
        if (isStepItemHit(pos, item, currentStep)) {
          document.body.style.cursor = "crosshair";
          childHit = true;
        }
      });
      if (!childHit) {
        document.body.style.cursor = "default";
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setDragging(null);
  };

  const allowDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <canvas
      className={styles.planningcanvas}
      ref={canvasRef}
      {...rest}
      onDrop={dropHandler}
      onDragOver={allowDrop}
      onMouseDown={onCanvasClicked}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      height={1000}
      width={1000}
      style={{ width: "500px", height: "500px" }}
    />
  );
}
