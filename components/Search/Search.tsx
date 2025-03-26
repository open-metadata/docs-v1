import classNames from "classnames";
import { isEmpty, isNull, isUndefined } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { useSearchContext } from "../../context/SearchContext";
import { ReactComponent as Loader } from "../../images/icons/loader.svg";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import CustomSearch from "./CustomSearch/CustomSearch";
import ResultItem from "./ResultItem/ResultItem";
import styles from "./Search.module.css";

interface SearchProps {
  showHotKeys?: boolean;
  className?: string;
  resultsContainerClassName?: string;
}

export default function Search({
  showHotKeys = true,
  className = "",
  resultsContainerClassName = "",
}: Readonly<SearchProps>) {
  const { docVersion } = useDocVersionContext();
  const [hotKey, setHotKey] = useState("second");
  const [searchValue, setSearchValue] = useState(""); // To manage search value with debouncing
  const [searchText, setSearchText] = useState(""); // To manage search input value
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState([]);
  const { navBarCollapsed } = useNavBarCollapsedContext();

  const { focusedSearchItem, onChangeFocusedSearchItem } = useSearchContext();

  const router = useRouter();

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchText = (value: string) => {
    setSearchText(value);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchValue("");
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
      const searchResults = document.querySelectorAll(
        `[class^="search-result-"]`
      );

      switch (e.key) {
        case "Enter": {
          goToResult(searchResults);
          break;
        }

        case "ArrowUp": {
          onChangeFocusedSearchItem((currentFocus) => {
            const focusedSearchItemNumber =
              currentFocus > 0 ? currentFocus - 1 : 1;

            bringElementIntoView(searchResults, focusedSearchItemNumber);

            return focusedSearchItemNumber;
          });
          break;
        }

        case "ArrowDown": {
          const resultCount = searchResults.length;

          onChangeFocusedSearchItem((currentFocus) => {
            const focusedSearchItemNumber =
              currentFocus < resultCount - 2 ? currentFocus + 1 : resultCount;

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
  }, [searchValue, focusedSearchItem, isSuggestionVisible]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      if (window[`pageFind${docVersion}`]) {
        const search = await window[`pageFind${docVersion}`].search(
          // To show results for "releases" as a default suggestions when no search text is present
          isEmpty(searchValue) ? "releases" : searchValue,
          { sort: { weight: "desc" } }
        );

        // Select only top 20 results
        const topResults = search.results.slice(0, 20);

        // The data for each search result should be loaded independently
        // ref: https://pagefind.app/docs/api/#loading-a-result
        const parsedResultsData = topResults.map(async (result) => {
          const resultData = await result.data();
          return { id: result.id, ...resultData };
        });

        setResults(await Promise.all(parsedResultsData));
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue, window[`pageFind${docVersion}`], docVersion]);

  return (
    <div
      className={classNames(
        styles.SearchContainer,
        navBarCollapsed ? styles.CollapsedNav : "",
        className
      )}
    >
      <CustomSearch
        searchText={searchText}
        handleSearchValue={handleSearchValue}
        handleSearchText={handleSearchText}
        handleIsSuggestionVisible={handleIsSuggestionVisible}
      />

      <SearchIcon className={styles.SearchIcon} />
      <div className={styles.HotKeyContainer}>
        {!isSuggestionVisible && showHotKeys && (
          <>
            <span className={styles.HotKey}>{hotKey}</span>
            <span>+</span>
            <span className={styles.HotKey}>K</span>
          </>
        )}
        {isSuggestionVisible && searchText && !isLoading && (
          <IoIosCloseCircleOutline
            className="cursor-pointer"
            onClick={clearSearch}
            size={18}
          />
        )}
        {isLoading && <Loader className={styles.LoadingIcon} />}
      </div>
      <div
        className={classNames(
          styles.SearchModal,
          isSuggestionVisible ? styles.VisibleModal : "",
          resultsContainerClassName
        )}
        id="search-modal"
      >
        {isEmpty(results) || isUndefined(results) ? (
          <div className={styles.NoDataPlaceholder}>No Results found</div>
        ) : (
          results.map((result, id) => (
            <ResultItem key={result.id} id={id} result={result} />
          ))
        )}
      </div>
    </div>
  );
}
