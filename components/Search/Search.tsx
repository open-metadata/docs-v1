import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";

export default function Search() {
  const [hotKey, setHotKey] = useState("second");

  useEffect(() => {
    if (window.innerWidth > 1024) {
      if (window.navigator.platform.indexOf("Mac") != -1) {
        setHotKey("⌘K");
      } else if (window.navigator.platform.indexOf("Win") != -1) {
        setHotKey("Ctrl-K");
      } else if (window.navigator.platform.indexOf("Linux") != -1) {
        setHotKey("Ctrl-K");
      }
    }
  }, []);
  return (
    <div className={styles.SearchContainer}>
      <div className="flex align-center">
        <SearchIcon className={styles.SearchIcon} />
        <p className={styles.SearchText}>Search</p>
      </div>
      <p>{hotKey}</p>
    </div>
  );
}
