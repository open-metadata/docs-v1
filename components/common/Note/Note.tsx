import React from "react";

import styles from "./Note.module.css";

import { ReactComponent as Pin } from "../../../images/icons/pin.svg";

const Note = ({ children }) => {
  return (
    <section className={styles.Container}>
      <span>
        <Pin className={styles.Icon} />
      </span>
      <div>{children}</div>
    </section>
  );
};

export default Note;
