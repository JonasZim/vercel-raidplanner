import React, { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <div className={styles.separator}>
        <hr />
        {title}
        <hr />
      </div>
      <div className={styles.iconcontainer}>{children}</div>
    </section>
  );
};

export default Section;
