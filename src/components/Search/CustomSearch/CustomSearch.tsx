import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch";
import { useSearchContext } from "../../../context/SearchContext";
import { isCommandKeyPress } from "../../../utils/SearchUtils";
import styles from "./CustomSearch.module.css";

interface CustomSearchProps {
  searchValue: string;
  searchText: string;
  bringElementIntoView: (
    searchResults: NodeListOf<Element>,
    focusedSearchItemNumber: number
  ) => void;
  handleSearchValue: (value: string) => void;
  handleSearchText: (value: string) => void;
  handleIsSuggestionVisible: (value: boolean) => void;
}

function CustomSearch({
  bringElementIntoView,
  searchValue,
  searchText,
  handleSearchValue,
  handleIsSuggestionVisible,
  handleSearchText,
}: CustomSearchProps) {
  const { refine } = useSearchBox();
  const searchInputRef = useRef<HTMLInputElement>();
  const { onChangeFocusedSearchItem } = useSearchContext();

  const handleSearchValueChange = useCallback(
    (searchText: string) => {
      handleSearchValue(searchText);
      onChangeFocusedSearchItem(1);

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
      debouncedSearch(value);
      handleSearchText(value);
    },
    [debouncedSearch, handleSearchText]
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("keydown", handleKeyDown);
    }
    document.body.addEventListener("keydown", handleGlobalSearchKeyDown);
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    refine(searchValue);
  }, [searchValue]);

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
