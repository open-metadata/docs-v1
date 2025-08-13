import React from "react";
import styles from "./Table.module.css";

function Table({ children }) {
  return (
    <div className={styles.TableContainer}>
      <table className={styles.Container}>{children}</table>
    </div>
  );
}

export default Table;
