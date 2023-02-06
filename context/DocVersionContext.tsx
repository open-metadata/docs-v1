import React, { useContext, useState } from "react";
import { DEFAULT_VERSION } from "../constants/version.constants";

export const DocVersionContext = React.createContext({
  docVersion: DEFAULT_VERSION,
  onChangeDocVersion: (version: string) => null,
});

export const useDocVersionContext = () => useContext(DocVersionContext);

export const DocVersionContextProvider = ({ children }) => {
  const [docVersion, setDocVersion] = useState(DEFAULT_VERSION);

  const onChangeDocVersion = (version: string) => {
    setDocVersion(version);
  };

  return (
    <DocVersionContext.Provider value={{ docVersion, onChangeDocVersion }}>
      {children}
    </DocVersionContext.Provider>
  );
};
