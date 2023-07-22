import Section from "../../section";
import { getSortedDraggablePlayerIcons } from "../../../utils/loadIcons";
import { getWaymarkDragIcons } from "../../../utils/loadWaymarks";
import { getLcDragIcons } from "../../../utils/loadLimitCut";
import { getEnemyDragIcons } from "../../../utils/loadBoss";
import React from "react";

export default function Objects() {
  return (
    <div>
      <Section title="Waymarks">{getWaymarkDragIcons()}</Section>
      <Section title="Jobs">{getSortedDraggablePlayerIcons()}</Section>
      <Section title="Limit Cuts">{getLcDragIcons()}</Section>
      <Section title="Enemies">{getEnemyDragIcons()}</Section>
    </div>
  );
}
