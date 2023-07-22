import styles from "./iconbar.module.css";
import { onDrag, calcOffset } from "../../utils/DragnDrop";
import Image from "next/image";
import { ObjectType } from "../../types";
import React from "react";

interface dragProps {
  src: string;
  alt: string;
  type: ObjectType;
}

export default function DragIcon({ src, alt, type }: dragProps) {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDrag(
      e,
      calcOffset(e, e.currentTarget.querySelector("img") as HTMLImageElement),
      type
    );
  };

  return (
    <div className={styles.playericon} draggable={true} onDragStart={dragStart}>
      <Image src={src} alt={alt} height={30} width={30} priority={true} />
    </div>
  );
}
