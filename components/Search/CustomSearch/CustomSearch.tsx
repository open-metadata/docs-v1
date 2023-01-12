import React, { useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { useSearchContext } from "../../../context/SearchContext";
import { isCommandKeyPress } from "../../../utils/SearchUtils";
import styles from "./CustomSearch.module.css";

interface CustomSearchProps {
  searchValue: string;
  bringElementIntoView: (
    searchResults: NodeListOf<Element>,
    focusedSearchItemNumber: number
  ) => void;
  handleSearchValue: (value: string) => void;
  handleIsSuggestionVisible: (value: boolean) => void;
}

function CustomSearch({
  bringElementIntoView,
  searchValue,
  handleSearchValue,
  handleIsSuggestionVisible,
}: CustomSearchProps) {
  const { refine } = useSearchBox();
  const searchInputRef = useRef<HTMLInputElement>();
  const { onChangeFocusedSearchItem } = useSearchContext();

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleSearchValue(event.target.value);
    onChangeFocusedSearchItem(1);

    setTimeout(() => {
      const searchResults = document.querySelectorAll(".ais-Hits-item");

      bringElementIntoView(searchResults, 1);
    }, 0);
  };

  const handleFocus = () => {
    handleIsSuggestionVisible(true);
  };

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
    switch (event.key) {
      case "k": {
        if (isCommandKeyPress(event)) {
          searchInputRef.current?.focus();
          event.preventDefault();
        }
      }
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target !== searchInputRef.current) {
      handleIsSuggestionVisible(false);
    }
  };

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
      ref={searchInputRef}
      value={searchValue}
      onChange={handleSearchValueChange}
      onFocus={handleFocus}
    />
  );
}

export default CustomSearch;
