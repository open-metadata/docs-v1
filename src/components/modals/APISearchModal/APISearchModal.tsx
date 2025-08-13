import algoliasearch from "algoliasearch/lite";
import { isNil } from "lodash";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { InstantSearch } from "react-instantsearch";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { SearchContextProvider } from "../../../context/SearchContext";
import styles from "../../PageLayouts/APIPageLayout/APIPageSideNav/APIPageSideNav.module.css";
import Search from "../../Search/Search";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

interface APISearchModalProps {
  handleMaskClick: () => void;
}

function APISearchModal({ handleMaskClick }: APISearchModalProps) {
  const { docVersion } = useDocVersionContext();

  useEffect(() => {
    setTimeout(() => {
      const inputElement = document.getElementById("search-input");

      !isNil(inputElement) && inputElement.focus();
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
            indexName={`openmetadata-v1-${docVersion}`}
            searchClient={searchClient}
            future={{
              preserveSharedStateOnUnmount: false, // Library recommendation to keep the old behavior
            }}
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
