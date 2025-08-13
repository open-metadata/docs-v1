import React, { ReactNode, useEffect } from "react";
import { useStepContext } from "../../../context/StepsContext";
import { getDivIndexFromId } from "../../../utils/CommonUtils";
import styles from "./StepsContainer.module.css";

interface StepsContainerProps {
  children: ReactNode;
}

function StepsContainer({ children }: StepsContainerProps) {
  const { onChangeSelectedStepNumber } = useStepContext();

  useEffect(() => {
    // Code to select the visible Step div element with scroll

    // Getting all the Step div elements
    const stepDivsArray = Array.from(
      document.querySelectorAll("[id^='step-']")
    );

    // Callback that will be called after the element is intersected
    const callback = (arr) => {
      const [stepInView] = arr;
      if (stepInView.isIntersecting) {
        onChangeSelectedStepNumber(getDivIndexFromId(stepInView.target.id));
      }
    };

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: "-40% 0px -50% 0px",
    });

    // Attaching the observer to all the Step div elements
    stepDivsArray.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return <div className={styles.Container}>{children}</div>;
}

export default StepsContainer;
