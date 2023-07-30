import styles from "./header.module.css";
import React from "react";

export default function Header(props: any) {
  return (
    <div
      className={styles.header}
      style={{ backgroundColor: "var(--darkest)" }}
    >
      {props.children}
    </div>
  );
}
