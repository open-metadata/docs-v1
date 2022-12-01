import React, { useContext, useState } from "react";

export const CodePreviewContext = React.createContext({
  selectedPreviewNumber: 0,
  changeSelectedPreviewNumber: (number: number) => null,
});

export const usePreviewContext = () => useContext(CodePreviewContext);

export const CodePreviewContextProvider = ({ children }) => {
  const [selectedPreviewNumber, setSelectedPreviewNumber] = useState(0);

  const changeSelectedPreviewNumber = (number: number) => {
    setSelectedPreviewNumber(number);
  };

  return (
    <CodePreviewContext.Provider
      value={{ selectedPreviewNumber, changeSelectedPreviewNumber }}
    >
      {children}
    </CodePreviewContext.Provider>
  );
};
