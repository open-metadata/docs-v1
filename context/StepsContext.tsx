import React, { useContext, useState } from "react";

export const StepsContext = React.createContext({
  selectedStepNumber: -1,
  changeSelectedStepNumber: (number: number) => null,
});

export const useStepContext = () => useContext(StepsContext);

export const StepsContextProvider = ({ children }) => {
  const [selectedStepNumber, setSelectedStepNumber] = useState(-1);

  const changeSelectedStepNumber = (number: number) => {
    setSelectedStepNumber(number);
  };

  return (
    <StepsContext.Provider
      value={{ selectedStepNumber, changeSelectedStepNumber }}
    >
      {children}
    </StepsContext.Provider>
  );
};
