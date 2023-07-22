import { Players, ObjectType } from "../../types";
import {
  getIconsByRole,
  jIconKeys,
  pIconKeys,
  iconStrings,
} from "../../utils/loadIcons";
//import "../../styling/icon-bar.css";
import Section from "../section";
import React from "react";
import Image from "next/image";

interface ChangePlayerIconsProps {
  player: Players;
  changingPlayer: Function;
}

export default function ChangePlayerIcons({
  player,
  changingPlayer,
}: ChangePlayerIconsProps) {
  const updatePlayer = (
    player: Players,
    img: string,
    type: jIconKeys | pIconKeys
  ) => {
    if (player.label === player.type) {
      player.label = type;
    }
    player.img = img;
    player.iconString = iconStrings[type];
    player.imgElement.src = iconStrings[type];

    player.type = ObjectType[type];
    changingPlayer();
  };

  const displayRoleIcons = () => {
    const icons = getIconsByRole(player);
    return Object.keys(icons).map((icon) => {
      return (
        <div key={icon} className="icon-row">
          <Image
            className="player-icon"
            src={icons[icon as keyof typeof icons]}
            alt={icon}
            height={30}
            width={30}
            onClick={() =>
              updatePlayer(
                player,
                icons[icon as keyof typeof icons],
                icon as jIconKeys | pIconKeys
              )
            }
          />
        </div>
      );
    });
  };

  return <Section title="Change Role Icon:">{displayRoleIcons()}</Section>;
}
