import React, { use, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../../PageLayouts/APIsPageLayout/APIsPageSideNav/APIsPageSideNav.module.css";
import { SearchContextProvider } from "../../../context/SearchContext";
import { InstantSearch } from "react-instantsearch-hooks-web";
import Search from "../../Search/Search";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

interface APISearchModalProps {
  handleMaskClick: () => void;
}

function APISearchModal({ handleMaskClick }: APISearchModalProps) {
  useEffect(() => {
    setTimeout(() => {
      const inputElement = document.getElementById("search-input");

      inputElement && inputElement.focus();
    }, 50);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.SearchModalMask} onClick={handleMaskClick}>
      <div
        className={styles.SearchModal}
        id="search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchContextProvider>
          <InstantSearch
            indexName="openmetadata-v1"
            searchClient={searchClient}
          >
            <Search
              className={styles.SearchContainer}
              showHotKeys={false}
              resultsContainerClassName={styles.SearchResults}
            />
          </InstantSearch>
        </SearchContextProvider>
      </div>
    </div>,
    document.getElementById("__next")
  );
}

export default APISearchModal;
