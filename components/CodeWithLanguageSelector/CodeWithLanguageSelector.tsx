import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useCodeWithLanguageSelectorContext } from "../../context/CodeWithLanguageSelectorContext";
import {
  getLanguageIcon,
  getLanguageName,
} from "../../utils/CodeWithLanugageSelectorUtils";
import codeStyles from "../common/Code/Code.module.css";
import styles from "./CodeWithLanguageSelector.module.css";

interface CodeWithLanguageSelectorProps {
  title: string;
  id: string;
  languagesArray: Array<string>;
  children: ReactNode;
  theme: "gray" | "light" | "default";
}

function CodeWithLanguageSelector({
  title,
  id,
  languagesArray,
  children,
  theme,
}: CodeWithLanguageSelectorProps) {
  const { selectedLanguageObject, onChangeSelectedLanguageObject } =
    useCodeWithLanguageSelectorContext();
  const containerId = useMemo(() => `content-${id}`, [id]);

  const handleLanguageSelect = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChangeSelectedLanguageObject({
        ...selectedLanguageObject,
        [id]: event.currentTarget.id,
      });
    },
    [selectedLanguageObject, onChangeSelectedLanguageObject]
  );

  useEffect(() => {
    onChangeSelectedLanguageObject((prevObject) => ({
      ...prevObject,
      [id]: languagesArray[0],
    }));
  }, []);

  useEffect(() => {
    const contentContainer = document.getElementById(containerId);
    const preElements = Array.from(
      contentContainer.querySelectorAll<HTMLDivElement>(
        "[class^='code-container-']"
      )
    );
    preElements.forEach((preElement) => {
      if (
        preElement.className.startsWith(
          `code-container-${selectedLanguageObject[id]} `
        )
      ) {
        preElement.style.display = "block";
        preElement.style.margin = "0px";
      } else {
        preElement.style.display = "none";
      }
    });
  }, [selectedLanguageObject]);

  const themeClass = useMemo(() => {
    switch (theme) {
      case "gray":
        return classNames(styles.Container, codeStyles.GrayTheme);
      case "light":
        return classNames(
          styles.Container,
          styles.LightThemeContainer,
          codeStyles.LightTheme
        );
      case "default":
      default:
        return styles.Container;
    }
  }, [theme]);

  return (
    <div className={themeClass}>
      <div className={classNames(codeStyles.Title)}>{title}</div>
      <div className={classNames(codeStyles.LanguageSelector)}>
        {languagesArray.map((language) => (
          <div
            className={classNames(
              styles.Language,
              language === selectedLanguageObject[id]
                ? codeStyles.SelectedLanguage
                : ""
            )}
            id={language}
            key={language}
            onClick={handleLanguageSelect}
          >
            <div>{getLanguageIcon(language)}</div>
            <div>{getLanguageName(language)}</div>
          </div>
        ))}
      </div>
      <div className={codeStyles.Content} id={containerId}>
        {children}
      </div>
    </div>
  );
}

export default CodeWithLanguageSelector;
