import React, { ReactNode, useEffect } from "react";
import { useStepContext } from "../../../context/StepsContext";
import { getDivIndexFromId } from "../../../utils/CommonUtils";
import styles from "./StepsContainer.module.css";

interface StepsContainerProps {
  children: ReactNode;
}

function StepsContainer({ children }: StepsContainerProps) {
  const { changeSelectedStepNumber } = useStepContext();

  useEffect(() => {
    // Code to select the visible Step div element with scroll

    // Getting all the Step divs
    const stepDivsArray = Array.from(
      document.querySelectorAll("[id^='step-']")
    );

    // Callback that will be called after the element is intersected
    const callback = (arr) => {
      const [stepInView] = arr;
      if (stepInView.isIntersecting) {
        changeSelectedStepNumber(
          Number(getDivIndexFromId(stepInView.target.id))
        );
      }
    };

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: "-40% 0px -50% 0px",
    });

    // Attatching the observer to all the Step divs
    stepDivsArray.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return <div className={styles.Container}>{children}</div>;
}

export default StepsContainer;
