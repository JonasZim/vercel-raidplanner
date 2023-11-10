import Section from "../../section";
import { getSortedDraggablePlayerIcons } from "../../../utils/loadingImages/loadIcons";
import { getWaymarkDragIcons } from "../../../utils/loadingImages/loadWaymarks";
import { getLcDragIcons } from "../../../utils/loadingImages/loadLimitCut";
import { getEnemyDragIcons } from "../../../utils/loadingImages/loadBoss";
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
