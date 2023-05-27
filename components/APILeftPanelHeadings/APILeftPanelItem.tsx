import React from "react";
import { isEmpty } from "lodash";
import styles from "./APILeftPanelHeadings.module.css";
import { HeadingObject } from "../PageLayouts/APIsPageLayout/APIsPageSideNav/APIsPageSideNav";

interface APILeftPanelItemProps {
  headingObject: HeadingObject;
}

function APILeftPanelItem({ headingObject }: APILeftPanelItemProps) {
  return (
    <div>
      {headingObject.label}
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
