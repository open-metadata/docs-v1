import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import APILeftPanelHeadings from "../../../APILeftPanelHeadings/APILeftPanelHeadings";
import { createNestedNodeStructure } from "../../../../utils/CommonUtils";
import { isEmpty } from "lodash";
import styles from "./APIsPageSideNav.module.css";
import APISearchModal from "../../../modals/APISearchModal/APISearchModal";

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
  const [searchModalVisibility, setSearchModalVisibility] =
    useState<boolean>(false);

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

  const handleSearchClick = useCallback(() => {
    setSearchModalVisibility(true);
  }, []);

  const handleMaskClick = useCallback(() => {
    setSearchModalVisibility(false);
  }, []);

  const handleKey = (e: KeyboardEvent) => {
    e.stopPropagation();

    switch (e.key) {
      case "/":
        setSearchModalVisibility(true);
        break;
      case "Escape":
        setSearchModalVisibility(false);
        break;
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKey);

    return () => {
      document.body.removeEventListener("keydown", handleKey);
    };
  }, []);

  return nestedHeadings.length > 1 ? (
    <div className={styles.APIsPageSideNavContainer}>
      <div className={styles.Heading}>
        <span className={styles.OpenMetadata}>OpenMetadata</span>
        <span className={styles.Api}>API</span>
      </div>
      <div className={styles.Search} onClick={handleSearchClick}>
        <div className="flex items-center gap-2">
          <SearchIcon className={styles.SearchIcon} />
          <div>Search</div>
        </div>
        <div className={styles.HotKeyContainer}>/</div>
      </div>
      <APILeftPanelHeadings headingObjects={nestedHeadings} />
      {searchModalVisibility && (
        <APISearchModal handleMaskClick={handleMaskClick} />
      )}
    </div>
  ) : null;
}

export default APIsPageSideNav;
