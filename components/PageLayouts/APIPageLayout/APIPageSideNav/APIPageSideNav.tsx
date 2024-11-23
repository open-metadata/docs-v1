import { isEmpty } from "lodash";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDocVersionContext } from "../../../../context/DocVersionContext";
import { ReactComponent as OmLogo } from "../../../../images/icons/om-monogram.svg";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import {
  createNestedNodeStructure,
  getUrl,
} from "../../../../utils/CommonUtils";
import APILeftPanelItem from "../../../APILeftPanelItem/APILeftPanelItem";
import APISearchModal from "../../../modals/APISearchModal/APISearchModal";
import styles from "./APIPageSideNav.module.css";

export interface HeadingObject {
  label: string;
  level: string;
  target: string;
  children?: HeadingObject[];
}

interface APIPageSideNavProps {
  pageInfoObject: {
    label: string;
    value: string;
    category?: string;
  };
}

function APIPageSideNav({ pageInfoObject }: APIPageSideNavProps) {
  const [nestedHeadings, setNestedHeadings] = useState<Array<HeadingObject>>(
    []
  );
  const { docVersion, enableVersion } = useDocVersionContext();
  const [searchModalVisibility, setSearchModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(
        [
          "[class^='api-description-container'] h1",
          "[class^='api-description-container'] h2",
          "[class^='api-description-container'] h3",
          "[class^='api-description-container'] h4",
          "[class^='api-description-container'] h5",
          "[class^='api-description-container'] h6",
        ].join(",")
      )
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

  return (
    <div className={styles.APIPageSideNavContainer}>
      <Link
        className={styles.Heading}
        href={getUrl({ url: pageInfoObject.value, docVersion, enableVersion })}
      >
        <OmLogo className={styles.OpenMetadataLogo} />
        <span className={styles.Api}>{pageInfoObject.label}</span>
        {pageInfoObject.category && (
          <span className={styles.Api}>{pageInfoObject.category}</span>
        )}
      </Link>
      <div className={styles.Search} onClick={handleSearchClick}>
        <div className="flex items-center gap-2">
          <SearchIcon className={styles.SearchIcon} />
          <div>Search</div>
        </div>
        <div className={styles.HotKeyContainer}>/</div>
      </div>
      {nestedHeadings.map((headingObject) => (
        <APILeftPanelItem
          headingObject={headingObject}
          key={`${headingObject.label}-${headingObject.level}`}
        />
      ))}
      {searchModalVisibility && (
        <APISearchModal handleMaskClick={handleMaskClick} />
      )}
    </div>
  );
}

export default APIPageSideNav;
