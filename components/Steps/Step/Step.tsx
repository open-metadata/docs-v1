import classNames from "classnames";
import React, { ReactNode, useMemo, useRef } from "react";
import { useStepContext } from "../../../context/StepsContext";
import { getDivIndexFromId } from "../../../utils/CommonUtils";
import styles from "./Step.module.css";

interface StepsProps {
  children: ReactNode;
  srNumber: number;
}

function Step({ children, srNumber }: StepsProps) {
  const stepContainer = useRef<HTMLDivElement>();
  const { selectedStepNumber, changeSelectedStepNumber } = useStepContext();

  const isSelected = useMemo(
    () => selectedStepNumber === srNumber,
    [selectedStepNumber, srNumber]
  );

  const handleClick = () => {
    const id = stepContainer.current.id;
    changeSelectedStepNumber(Number(getDivIndexFromId(id)));
  };

  return (
    <div
      className={classNames(
        styles.Container,
        isSelected ? styles.HighlitedStep : ""
      )}
      id={`step-${srNumber}`}
      ref={stepContainer}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default Step;
