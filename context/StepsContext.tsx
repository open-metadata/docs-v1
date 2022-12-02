import React, { useContext, useState } from "react";

export const StepsContext = React.createContext({
  selectedStepNumber: -1,
  onChangeSelectedStepNumber: (number: number) => null,
});

export const useStepContext = () => useContext(StepsContext);

export const StepsContextProvider = ({ children }) => {
  const [selectedStepNumber, setSelectedStepNumber] = useState(-1);

  const onChangeSelectedStepNumber = (number: number) => {
    setSelectedStepNumber(number);
  };

  return (
    <StepsContext.Provider
      value={{ selectedStepNumber, onChangeSelectedStepNumber }}
    >
      {children}
    </StepsContext.Provider>
  );
};
