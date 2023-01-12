import React, { useContext, useState } from "react";

export const SearchContext = React.createContext({
  focusedSearchItem: 1,
  onChangeFocusedSearchItem: (number: number | ((num: number) => number)) =>
    null,
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [focusedSearchItem, setFocusedSearchItem] = useState(1);

  const onChangeFocusedSearchItem = (
    number: number | ((num: number) => number)
  ) => {
    setFocusedSearchItem(number);
  };

  return (
    <SearchContext.Provider
      value={{ focusedSearchItem, onChangeFocusedSearchItem }}
    >
      {children}
    </SearchContext.Provider>
  );
};
