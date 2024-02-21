import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { useSearchContext } from "../../../context/SearchContext";
import { isCommandKeyPress } from "../../../utils/SearchUtils";
import styles from "./CustomSearch.module.css";

interface CustomSearchProps {
  searchText: string;
  handleSearchValue: (value: string) => void;
  handleSearchText: (value: string) => void;
  handleIsSuggestionVisible: (value: boolean) => void;
}

function CustomSearch({
  searchText,
  handleSearchValue,
  handleIsSuggestionVisible,
  handleSearchText,
}: Readonly<CustomSearchProps>) {
  const { docVersion } = useDocVersionContext();
  const searchInputRef = useRef<HTMLInputElement>();
  const { onChangeFocusedSearchItem } = useSearchContext();

  const handleSearchValueChange = useCallback(
    (searchText: string) => {
      handleSearchValue(searchText);
      onChangeFocusedSearchItem(0);

      setTimeout(() => {
        const searchResults = document.getElementById("search-modal");

        searchResults.scrollTo({
          top: 0,
        });
      }, 0);
    },
    [document]
  );

  const handleFocus = () => {
    handleIsSuggestionVisible(true);
  };

  const debouncedSearch = useCallback(debounce(handleSearchValueChange, 500), [
    handleSearchValueChange,
  ]);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape": {
        handleIsSuggestionVisible(false);
        searchInputRef.current.blur();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        break;
      }
    }
  };

  const handleGlobalSearchKeyDown = (event: KeyboardEvent) => {
    if (event.key === "k" && isCommandKeyPress(event)) {
      searchInputRef.current?.focus();
      event.preventDefault();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target !== searchInputRef.current) {
      handleIsSuggestionVisible(false);
    }
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      window[`pageFind${docVersion}`].preload(value);
      debouncedSearch(value);
      handleSearchText(value);
    },
    [debouncedSearch, handleSearchText, docVersion]
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("keydown", handleKeyDown);
    }
    document.body.addEventListener("keydown", handleGlobalSearchKeyDown);
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  return (
    <input
      className={styles.Input}
      placeholder="Search"
      id="search-input"
      ref={searchInputRef}
      value={searchText}
      onChange={handleInputChange}
      onFocus={handleFocus}
    />
  );
}

export default CustomSearch;
