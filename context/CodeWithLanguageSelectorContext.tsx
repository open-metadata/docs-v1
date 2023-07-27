import React, { useContext, useMemo, useState } from "react";

/*
  type of an object to store the selected language for different CodeWithLanguageSelector components
  based on id of the containers
 */
interface SelectedLanguageObject {
  [containerId: string]: string;
}

export const CodeWithLanguageSelectorContext = React.createContext({
  selectedLanguageObject: {},
  onChangeSelectedLanguageObject: (
    selectedLangObject:
      | SelectedLanguageObject
      | ((selectedLangObject: SelectedLanguageObject) => SelectedLanguageObject)
  ) => null,
});

export const useCodeWithLanguageSelectorContext = () =>
  useContext(CodeWithLanguageSelectorContext);

export const CodeWithLanguageSelectorContextProvider = ({ children }) => {
  const [selectedLanguageObject, setSelectedLanguageObject] =
    useState<SelectedLanguageObject>({});

  const onChangeSelectedLanguageObject = (
    selectedLangObject:
      | SelectedLanguageObject
      | ((selectedLangObject: SelectedLanguageObject) => SelectedLanguageObject)
  ) => {
    setSelectedLanguageObject(selectedLangObject);
  };

  const contextProviderValues = useMemo(
    () => ({ selectedLanguageObject, onChangeSelectedLanguageObject }),
    [selectedLanguageObject, onChangeSelectedLanguageObject]
  );

  return (
    <CodeWithLanguageSelectorContext.Provider value={contextProviderValues}>
      {children}
    </CodeWithLanguageSelectorContext.Provider>
  );
};
