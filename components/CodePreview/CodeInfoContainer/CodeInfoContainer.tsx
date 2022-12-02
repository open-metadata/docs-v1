import React, { useEffect } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import { getDivIndexFromId } from "../../../utils/CommonUtils";
import styles from "./CodeInfoContainer.module.css";

export default function CodeInfoContainer({ children }) {
  const { onChangeSelectedPreviewNumber } = usePreviewContext();
  useEffect(() => {
    // Code to select the visible code info div element with scroll

    // Getting all the code info div elements
    const codeInfoDivsArray = Array.from(
      document.querySelectorAll("[id^='code-info-']")
    );

    // Callback that will be called after the element is intersected
    const callback = (arr) => {
      const [codeInfoInView] = arr;
      if (codeInfoInView.isIntersecting) {
        onChangeSelectedPreviewNumber(
          getDivIndexFromId(codeInfoInView.target.id)
        );
      }
    };

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: "-40% 0px -55% 0px",
    });

    // Attaching the observer to all the Info div elements
    codeInfoDivsArray.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return <div className={styles.Container}>{children}</div>;
}
