import styles from "./header.module.css";
import React from "react";

export default function Header(props: any) {
  return <div className={styles.header}>{props.children}</div>;
}
