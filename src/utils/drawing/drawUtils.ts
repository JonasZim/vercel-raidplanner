import {
  Point,
  AnObject,
  isPlayers,
  Players,
  Attacc,
  baseObject,
  isDpss,
  isHealers,
  isTanks,
} from "../../types";
import { calcDistance } from "../maffs";

const getPlayersByDistance = (
  players: Players[],
  point: Point,
  step: number
) => {
  return players.sort((a: Players, b: Players) => {
    const aDist = calcDistance(a[step].pos, point);
    const bDist = calcDistance(b[step].pos, point);
    if (aDist === 0) {
      return Infinity;
    }
    if (bDist === 0) {
      return -Infinity;
    }
    return aDist - bDist;
  });
};

const getPlayer = (objects: AnObject[]): Players[] => {
  return objects.filter((element: AnObject) => {
    return isPlayers(element);
  }) as Players[];
};

export const getTargets = (
  attack: Attacc,
  parent: number,
  allElements: AnObject[],
  step: number
): Players[][] => {
  const players = getPlayer(allElements as AnObject[]);
  const playerByDist = getPlayersByDistance(
    players,
    attack[step].parents[parent][step].pos,
    step
  );
  if (!attack[step].targets) return [];
  return attack[step].targets.map((tar: number | string | baseObject) => {
    if (typeof tar === "number") {
      return [playerByDist[tar - 1]];
    } else {
      switch (tar) {
        case "dps": {
          return players.filter((player: Players) => {
            return isDpss(player);
          });
        }
        case "healer": {
          return players.filter((player: Players) => {
            return isHealers(player);
          });
        }
        case "tank": {
          return players.filter((player: Players) => {
            return isTanks(player);
          });
        }
        case "support": {
          return players.filter((player: Players) => {
            return isTanks(player) || isHealers(player);
          });
        }
        default: {
          return [];
        }
      }
    }
  });
};
