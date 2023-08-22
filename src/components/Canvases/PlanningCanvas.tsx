import styles from "./canvases.module.css";
import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import { onDrop } from "../../utils/DragnDrop";
import {
  AnObject,
  isAttacks,
  isPossibleParent,
  isToppings,
  isWaymarks,
  Point,
} from "../../types";
import { drawAnObject, drawElementSelection } from "../../utils/drawUtils";
import { drawHandlesForSelected } from "../../utils/drawHandles";
import { isStepItemHit } from "../../utils/maffs";
import { createAnObject } from "../../utils/utils";
import { useCounter } from "../../IdProvider";
import { StepContext } from "../App";
import GenerateImages from "../../utils/GenerateImages";

export default function PlanningCanvas(props: any) {
  const { counter, incrementCounter } = useCounter();
  const currentStep = useContext(StepContext);

  const {
    allElements,
    setAllElements,
    selectedElement,
    setSelectedElement,
    arena,
    ...rest
  } = props;

  const [dragging, setDragging] = useState<Point | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isAnimatingRef = useRef(false);
  const [rectPos, setRectPos] = useState<Point | null>(null);
  const [stepItems, setStepItems] = useState<AnObject[]>([]);

  const imageRecord = useRef(GenerateImages());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      setRectPos({
        x: rect.left + arena.width / 2 + arena.padding,
        y: rect.top + arena.width / 2 + arena.padding,
      });

      canvas.height = arena.height * 2 + arena.padding * 4;
      canvas.width = arena.width * 2 + arena.padding * 4;
      canvas.style.height = `${arena.height + arena.padding * 2}px`;
      canvas.style.width = `${arena.width + arena.padding * 2}px`;
    }
  }, [arena, canvasRef]);

  useEffect(() => {
    const items = allElements.filter((element: AnObject) => {
      return element[currentStep] !== undefined || isWaymarks(element);
    });
    setStepItems(items);
  }, [allElements, currentStep]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || stepItems.length === 0) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    stepItems.forEach((item: AnObject) => {
      drawAnObject(ctx, item, currentStep, stepItems, imageRecord.current);
    });
    if (
      selectedElement &&
      (isWaymarks(selectedElement) || selectedElement[currentStep])
    ) {
      //drawElementSelection(ctx, selectedElement, currentStep);
      drawHandlesForSelected(ctx, selectedElement, currentStep, stepItems);
    }
    ctx.restore();
  };

  const animate = () => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      drawCanvas();
      isAnimatingRef.current = false;
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, [drawCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rectPos) return;
    const onMouseDown = (e: MouseEvent) => {
      const pos = {
        x: e.clientX - rectPos.x,
        y: e.clientY - rectPos.y,
      };
      let childHit2 = false;
      stepItems.forEach((item: AnObject) => {
        let offset;
        if (isStepItemHit(pos, item, currentStep)) {
          if (isWaymarks(item)) {
            setSelectedElement(item);
            offset = {
              x: item.pos.x - e.clientX + rectPos.x,
              y: item.pos.y - e.clientY + rectPos.y,
            };
            setDragging(offset);
            childHit2 = true;
          } else if (isPossibleParent(item)) {
            setSelectedElement(item);
            offset = {
              x: item[currentStep].pos.x - e.clientX + rectPos.x,
              y: item[currentStep].pos.y - e.clientY + rectPos.y,
            };
            setDragging(offset);
            childHit2 = true;
          } else if (
            (isAttacks(item) || isToppings(item)) &&
            item[currentStep].parents.length === 0
          ) {
            setSelectedElement(item);
            offset = {
              x: item[currentStep].pos.x - e.clientX + rectPos.x,
              y: item[currentStep].pos.y - e.clientY + rectPos.y,
            };
            setDragging(offset);
            childHit2 = true;
          }
        }
      });
      if (!childHit2) {
        setSelectedElement(null);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = {
        x: e.clientX - rectPos.x,
        y: e.clientY - rectPos.y,
      };
      if (dragging) {
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
      }

      if (!dragging) {
        let childHit = false;
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

    const onMouseUp = (e: MouseEvent) => {
      const pos = {
        x: e.clientX - rectPos.x,
        y: e.clientY - rectPos.y,
      };
      if (dragging) {
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
      setDragging(null);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    canvasRef,
    dragging,
    selectedElement,
    allElements,
    currentStep,
    rectPos,
    stepItems,
  ]);

  const calcPosOnCanvas = (
    offset: Point,
    e: React.MouseEvent | React.DragEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(
        e.clientX - rect.left - offset.x - arena.width / 2 - arena.padding
      );
      const y = Math.round(
        e.clientY - rect.top - offset.y - arena.height / 2 - arena.padding
      );
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
    />
  );
}
