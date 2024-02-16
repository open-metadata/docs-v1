import React, { useContext, useMemo, useState } from "react";

export const SearchContext = React.createContext({
  focusedSearchItem: 0,
  onChangeFocusedSearchItem: (number: number | ((num: number) => number)) =>
    null,
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [focusedSearchItem, setFocusedSearchItem] = useState(0);

  const onChangeFocusedSearchItem = (
    number: number | ((num: number) => number)
  ) => {
    setFocusedSearchItem(number);
  };

  const contextValue = useMemo(
    () => ({ focusedSearchItem, onChangeFocusedSearchItem }),
    [focusedSearchItem, onChangeFocusedSearchItem]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
