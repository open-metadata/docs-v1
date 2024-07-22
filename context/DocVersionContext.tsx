import React, { useContext, useMemo, useState } from "react";
import { DEFAULT_VERSION } from "../constants/version.constants";

export const DocVersionContext = React.createContext({
  docVersion: DEFAULT_VERSION,
  onChangeDocVersion: (version: string) => null,
  enableVersion: true
});

export const useDocVersionContext = () => useContext(DocVersionContext);

export const DocVersionContextProvider = ({ children, enableVersion = true }) => {
  const [docVersion, setDocVersion] = useState(DEFAULT_VERSION);

  const onChangeDocVersion = (version: string) => {
    setDocVersion(version);
  };

  const contextValue = useMemo(
    () => ({
      docVersion,
      onChangeDocVersion,
      enableVersion,
    }),
    [docVersion, onChangeDocVersion, enableVersion]
  );

  return (
    <DocVersionContext.Provider value={contextValue}>
      {children}
    </DocVersionContext.Provider>
  );
};
