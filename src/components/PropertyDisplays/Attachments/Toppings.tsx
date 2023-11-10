import {
  getAllLcIcons,
  Lc,
  Dsr,
  getAllDsrIcons,
  createLcObject,
  createDsrObject,
} from "../../../utils/loadingImages/loadLimitCut";
import { AnObject, ToppingObject, PossibleParentObject } from "../../../types";
import Section from "../../section";
import { useCounter } from "../../../IdProvider";
import { StepContext } from "../../App";
import { useContext } from "react";
import React from "react";
import Image from "next/image";

interface Props {
  object: PossibleParentObject;
  changingPlayer: Function;
  addElements: Function;
  allElements: AnObject[];
}

export default function Toppings({
  object,
  changingPlayer,
  addElements,
  allElements,
}: Props) {
  const { counter, incrementCounter } = useCounter();
  const currentStep = useContext(StepContext);

  const configureTopping = (topping: ToppingObject) => {
    topping = {
      ...topping,
      id: counter,
    };

    topping[currentStep] = {
      pos: {
        x: object[currentStep].pos.x,
        y:
          object[currentStep].pos.y -
          object[currentStep].size.y -
          topping.offset.y,
      },
      parents: [object],
    };
    incrementCounter();
    const newElements = allElements.push(topping);
    addElements(newElements);
    changingPlayer();
  };

  const LcIcons = () => {
    const icons = getAllLcIcons();
    return Object.keys(icons).map((key) => {
      return (
        <Image
          key={key}
          src={icons[key as Lc]}
          alt={key}
          width={30}
          height={30}
          onClick={(e) =>
            configureTopping(createLcObject(key as Lc, currentStep))
          }
        />
      );
    });
  };

  const DsrIcons = () => {
    const icons = getAllDsrIcons();
    return Object.keys(icons).map((key) => {
      return (
        <Image
          style={{ width: "30px", height: "30px" }}
          key={key}
          src={icons[key as Dsr]}
          alt={key}
          width={30}
          height={30}
          onClick={(e) =>
            configureTopping(createDsrObject(key as Dsr, currentStep))
          }
        />
      );
    });
  };

  return (
    <>
      <Section title="Limit Cut">{LcIcons()}</Section>
      <Section title="Playstation">{DsrIcons()}</Section>
    </>
  );
}
