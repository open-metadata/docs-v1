import React, { useEffect, useState } from "react";
import styles from "./APIsPageSideNav.module.css";
import APILeftPanelHeadings from "../../../APILeftPanelHeadings/APILeftPanelHeadings";
import { createNestedNodeStructure } from "../../../../utils/CommonUtils";

export interface HeadingObject {
  label: string;
  level: string;
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
      return {
        label: heading.innerText,
        level: heading.tagName,
      };
    });

    const result = createNestedNodeStructure(headingObjectsArray);

    setNestedHeadings(result);
  }, []);

  return nestedHeadings.length > 1 ? (
    <div className={styles.APIsPageSideNavContainer}>
      <APILeftPanelHeadings headingObjects={nestedHeadings} />
    </div>
  ) : null;
}

export default APIsPageSideNav;
