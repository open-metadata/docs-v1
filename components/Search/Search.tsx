import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import { ReactComponent as Loader } from "../../images/icons/loader.svg";
import {
  Configure,
  Hits,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import classNames from "classnames";
import CustomSearch from "./CustomSearch/CustomSearch";
import { useRouter } from "next/router";
import { useSearchContext } from "../../context/SearchContext";
import HitComponent from "./HitComponent/HitComponent";
import { isEmpty, isNull, isUndefined } from "lodash";

export default function Search() {
  const [hotKey, setHotKey] = useState("second");
  const [searchValue, setSearchValue] = useState("");
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false);
  const [showNoDataPlaceHolder, setShowNoDataPlaceHolder] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();

  const { status, results } = useInstantSearch();

  const { focusedSearchItem, onChangeFocusedSearchItem } = useSearchContext();

  const router = useRouter();

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleIsSuggestionVisible = (value: boolean) => {
    setIsSuggestionVisible(value);
  };

  const goToResult = (searchResults: NodeListOf<Element>) => {
    const focusedResult = searchResults[focusedSearchItem - 1];

    const a = focusedResult.querySelector("a").getAttribute("href");
    router.push(a);
  };

  const bringElementIntoView = (
    searchResults: NodeListOf<Element>,
    focusedSearchItemNumber: number
  ) => {
    const itemToFocus = searchResults[focusedSearchItemNumber - 1];

    if (!isUndefined(itemToFocus)) {
      itemToFocus.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (isSuggestionVisible) {
      const searchResults = document.querySelectorAll(".ais-Hits-item");

      switch (e.key) {
        case "Enter": {
          goToResult(searchResults);
          break;
        }

        case "ArrowUp": {
          onChangeFocusedSearchItem((currentFocus) => {
            const focusedSearchItemNumber =
              currentFocus > 1 ? currentFocus - 1 : 1;

            bringElementIntoView(searchResults, focusedSearchItemNumber);

            return focusedSearchItemNumber;
          });
          break;
        }

        case "ArrowDown": {
          const resultCount = searchResults.length;

          onChangeFocusedSearchItem((currentFocus) => {
            const focusedSearchItemNumber =
              currentFocus < resultCount - 1 ? currentFocus + 1 : resultCount;

            bringElementIntoView(searchResults, focusedSearchItemNumber);

            return focusedSearchItemNumber;
          });
          break;
        }
      }
    }
  };

  useEffect(() => {
    const platformMatch = window.navigator.userAgent.match(/(\(\w+;)/g);

    if (!isEmpty(platformMatch) && !isNull(platformMatch)) {
      const platform = platformMatch[0].slice(1, -1);

      if (platform.indexOf("Mac") != -1) {
        setHotKey("⌘");
      } else if (platform.indexOf("Win") != -1) {
        setHotKey("Ctrl");
      } else if (platform.indexOf("Linux") != -1) {
        setHotKey("Ctrl");
      }
    } else {
      setHotKey("Ctrl");
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKey);

    return () => {
      document.body.removeEventListener("keydown", handleKey);
    };
  }, [searchValue, focusedSearchItem]);

  useEffect(() => {
    setIsLoading(status === "loading");
  }, [status]);

  useEffect(() => {
    setShowNoDataPlaceHolder(isEmpty(results.hits));
  }, [results]);

  return (
    <div className={styles.SearchContainer}>
      <CustomSearch
        bringElementIntoView={bringElementIntoView}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        handleIsSuggestionVisible={handleIsSuggestionVisible}
      />

      <SearchIcon className={styles.SearchIcon} />
      <div className={styles.HotKeyContainer}>
        {!isSuggestionVisible && (
          <>
            <span className={styles.HotKey}>{hotKey}</span>
            <span>+</span>
            <span className={styles.HotKey}>K</span>
          </>
        )}
        {isLoading && <Loader className={styles.LoadingIcon} />}
      </div>
      <div
        className={classNames(
          styles.SearchModal,
          isSuggestionVisible ? styles.VisibleModal : ""
        )}
        id="search-modal"
      >
        <Configure
          attributesToSnippet={["content:10"]}
          snippetEllipsisText={"..."}
        />
        {showNoDataPlaceHolder ? (
          <div className={styles.NoDataPlaceholder}>No Results found</div>
        ) : (
          <Hits
            classNames={{
              item: styles.ListItem,
            }}
            hitComponent={HitComponent}
          />
        )}
      </div>
    </div>
  );
}
