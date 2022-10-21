import React, { useEffect } from "react";
import { usePreviewContext } from "../../../context/CodePreviewContext";
import { getCodeDivIndexFromId } from "../../../utils/codePreview";
import styles from "./CodeInfoContainer.module.css";

export default function CodeInfoContainer({ children }) {
  const { changeSelectedPreviewNumber } = usePreviewContext();
  useEffect(() => {
    // Code to select the visible conde info div element with scroll

    // Getting all the code info divs
    const codeInfoDivsArray = Array.from(
      document.querySelectorAll("[id^='code-info-']")
    );

    // Callback that will be called after the element is intersected
    const callback = (arr) => {
      const [codeInfoInView] = arr;
      if (codeInfoInView.isIntersecting) {
        changeSelectedPreviewNumber(
          Number(getCodeDivIndexFromId(codeInfoInView.target.id))
        );
      }
    };

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: "-40% 0px -50% 0px",
    });

    // Attatching the observer to all the Info divs
    codeInfoDivsArray.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return <div className={styles.Container}>{children}</div>;
}
