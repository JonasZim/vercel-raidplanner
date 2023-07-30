import styles from "./iconbar.module.css";

import IconTab from "./IconTabs";
import { useState } from "react";
import React from "react";

import FirstTab from "./tabs/first";
import SecondTab from "./tabs/second";

export default function IconBar() {
  const [selected, setSelected] = useState(1);

  const getContent = () => {
    switch (selected) {
      case 1:
        return <FirstTab />;
      case 2:
        return <SecondTab />;
    }
  };

  return (
    <div
      className={styles.iconbar}
      style={{ backgroundColor: "var(--darkest)", color: "var(--text-color)" }}
    >
      <div className={styles.iconbarheader}>
        <IconTab description={1} onSelection={() => setSelected(1)} />
        <IconTab description={2} onSelection={() => setSelected(2)} />
        <IconTab description={3} onSelection={() => setSelected(3)} />
        <IconTab description={4} onSelection={() => setSelected(4)} />
        <IconTab description={5} onSelection={() => setSelected(5)} />
      </div>
      <div className={styles.iconbarcontent}>{getContent()}</div>
    </div>
  );
}
