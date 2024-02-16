import classNames from "classnames";
import Link from "next/link";
import { useRef } from "react";
import { useSearchContext } from "../../../context/SearchContext";
import { ResultsProps } from "./ResultItem.interface";
import styles from "./ResultItem.module.css";

export default function Results({ result, id }: Readonly<ResultsProps>) {
  const { focusedSearchItem, onChangeFocusedSearchItem } = useSearchContext();
  const resultItemRef = useRef<HTMLButtonElement>(null);

  const handleHover = () => {
    const searchItems = document.querySelectorAll(`[class^="search-result-"]`);

    searchItems.forEach((item) => {
      item.classList.remove(styles.ActiveContainer);
    });

    resultItemRef.current.classList.add(styles.ActiveContainer);

    const elementSerialNumber = resultItemRef.current.id.split("-")[2];
    onChangeFocusedSearchItem(Number(elementSerialNumber));
  };

  return (
    <Link href={result.raw_url ?? result.url}>
      <button
        className={classNames(
          `search-result-${id}`,
          styles.Container,
          id === focusedSearchItem ? styles.ActiveContainer : ""
        )}
        id={`search-result-${id}`}
        key={result.id}
        ref={resultItemRef}
        onMouseEnter={handleHover}
      >
        <span className={styles.ResultTitle}>{result.meta.title}</span>
        <span dangerouslySetInnerHTML={{ __html: result.excerpt }}></span>
      </button>
    </Link>
  );
}
