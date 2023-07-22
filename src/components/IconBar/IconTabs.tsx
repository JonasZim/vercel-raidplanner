import styles from "./iconbar.module.css";
import React from "react";

interface IconTabProps {
  description: number;
  onSelection: Function;
}

export default function IconTab({ description, onSelection }: IconTabProps) {
  return (
    <div className={styles.icontab} onClick={() => onSelection()}>
      {description}
    </div>
  );
}
