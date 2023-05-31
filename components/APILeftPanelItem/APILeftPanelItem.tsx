import React, { useCallback, useMemo } from "react";
import { isEmpty } from "lodash";
import { HeadingObject } from "../PageLayouts/APIsPageLayout/APIsPageSideNav/APIsPageSideNav";
import classNames from "classnames";
import { useAPIElementInViewContext } from "../../context/APIElementInViewContext";
import styles from "./APILeftPanelItem.module.css";

interface APILeftPanelItemProps {
  headingObject: HeadingObject;
}

function APILeftPanelItem({ headingObject }: APILeftPanelItemProps) {
  const { apiElementInView, onChangeApiElementInView } =
    useAPIElementInViewContext();

  const isElementSelected = useMemo(() => {
    return headingObject.target === apiElementInView;
  }, [apiElementInView, headingObject]);

  const itemLevelStyle = useMemo(() => {
    switch (headingObject.level) {
      case "H3":
        return styles.H3Style;
      case "H4":
        return styles.H4Style;
      case "H5":
        return styles.H5Style;
      case "H6":
        return styles.H6Style;
      default:
        return "";
    }
  }, [headingObject]);

  const handleItemLabelClick = useCallback(() => {
    const element = document.getElementById(headingObject.target);
    window.location.hash = headingObject.target;
    onChangeApiElementInView(headingObject.target);

    element &&
      element.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
  }, [headingObject]);

  return (
    <div className={styles.ItemContainer}>
      <div
        className={classNames(
          styles.ItemLabel,
          itemLevelStyle,
          isElementSelected ? styles.ActiveLabel : ""
        )}
        onClick={handleItemLabelClick}
      >
        {headingObject.label}
      </div>
      {!isEmpty(headingObject.children) && (
        <div className={styles.ItemChildrenContainer}>
          {headingObject.children.map((childHeading) => (
            <APILeftPanelItem
              headingObject={childHeading}
              key={`${childHeading.label}-${childHeading.level}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default APILeftPanelItem;
