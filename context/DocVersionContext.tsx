import React, { useContext, useState } from "react";

export const DocVersionContext = React.createContext({
  docVersion: "v0.13.2",
  onChangeDocVersion: (version: string) => null,
});

export const useDocVersionContext = () => useContext(DocVersionContext);

export const DocVersionContextProvider = ({ children }) => {
  const [docVersion, setDocVersion] = useState("v0.13.2");

  const onChangeDocVersion = (version: string) => {
    setDocVersion(version);
  };

  return (
    <DocVersionContext.Provider value={{ docVersion, onChangeDocVersion }}>
      {children}
    </DocVersionContext.Provider>
  );
};
