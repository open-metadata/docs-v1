import React, { ReactNode, useMemo, useRef } from "react";
import { ReactComponent as StepIcon } from "../../../../images/icons/step-icon.svg";
import { ReactComponent as SelectedStepIcon } from "../../../../images/icons/selected-step-icon.svg";
import styles from "./StepDescription.module.css";
import { useStepContext } from "../../../../context/StepsContext";
import {
  generateIdFromHeading,
  getDivIndexFromId,
} from "../../../../utils/CommonUtils";
import { Heading } from "../../../Heading/Heading";

interface StepDescriptionProp {
  children: ReactNode;
  title: string;
}

function StepDescription({ children, title }: StepDescriptionProp) {
  const stepDescriptionContainer = useRef<HTMLDivElement>();
  const { selectedStepNumber } = useStepContext();

  const parentId = useMemo(
    () =>
      getDivIndexFromId(
        stepDescriptionContainer.current
          ? stepDescriptionContainer.current.parentElement.id
          : ""
      ),
    [stepDescriptionContainer.current]
  );

  const isStepSelected = useMemo(
    () => selectedStepNumber === parentId,
    [selectedStepNumber, stepDescriptionContainer.current]
  );

  return (
    <div className={styles.Container} ref={stepDescriptionContainer}>
      <span className={styles.Heading}>
        {isStepSelected ? <SelectedStepIcon /> : <StepIcon />}
        <Heading
          className={isStepSelected ? styles.HighlightedStepHeading : ""}
          id={generateIdFromHeading(title)}
          level={4}
        >
          {title}
        </Heading>
      </span>
      <div className={styles.Description}>{children}</div>
    </div>
  );
}

export default StepDescription;
