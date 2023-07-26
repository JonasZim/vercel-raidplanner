import styles from "./iconbar.module.css";
import React from "react";

interface IconTabProps {
  description: number;
  onSelection: Function;
}

export default function IconTab({ description, onSelection }: IconTabProps) {
  return (
    <div
      className={styles.icontab}
      onClick={() => onSelection()}
      style={{
        backgroundColor: "var(--darkest)",
        color: "var(--text-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {description}
    </div>
  );
}
