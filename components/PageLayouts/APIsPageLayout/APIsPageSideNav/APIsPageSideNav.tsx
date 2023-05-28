import React, { useEffect, useState } from "react";
import styles from "./APIsPageSideNav.module.css";
import APILeftPanelHeadings from "../../../APILeftPanelHeadings/APILeftPanelHeadings";
import { createNestedNodeStructure } from "../../../../utils/CommonUtils";
import { isEmpty } from "lodash";

export interface HeadingObject {
  label: string;
  level: string;
  target: string;
  children?: HeadingObject[];
}

function APIsPageSideNav() {
  const [nestedHeadings, setNestedHeadings] = useState<Array<HeadingObject>>(
    []
  );

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const headingObjectsArray = headingElements.map((heading) => {
      const headingAnchorTag = heading.getElementsByTagName("a");

      if (!isEmpty(headingAnchorTag)) {
        const target = headingAnchorTag[0].getAttribute("id");

        return {
          label: heading.innerText,
          level: heading.tagName,
          target,
        };
      }
    });

    const result = createNestedNodeStructure(headingObjectsArray);

    setNestedHeadings(result);
  }, []);

  return nestedHeadings.length > 1 ? (
    <div className={styles.APIsPageSideNavContainer}>
      <div className={styles.Heading}>
        <span className={styles.OpenMetadata}>OpenMetadata</span>
        <span className={styles.Api}>API</span>
      </div>
      <APILeftPanelHeadings headingObjects={nestedHeadings} />
    </div>
  ) : null;
}

export default APIsPageSideNav;
