import classNames from "classnames";
import { useEffect, useRef } from "react";
import { Highlight, Snippet } from "react-instantsearch";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { useSearchContext } from "../../../context/SearchContext";
import { getUrl } from "../../../utils/CommonUtils";
import styles from "../Search.module.css";
import ParamLink from "../../ParamLink";
import { useRouter } from "next/router";

function HitComponent(props) {
  const { focusedSearchItem, onChangeFocusedSearchItem } = useSearchContext();
  const { enableVersion } = useDocVersionContext();
  const router = useRouter();
  const articleItemRef = useRef<HTMLElement>();

  const category = props.hit.categories
    ? props.hit.categories.join(" > ")
    : "Page";

  const handleHover = () => {
    const searchItems = document.querySelectorAll(`.${styles.HitContainer}`);

    searchItems.forEach((item) => {
      item.classList.remove(styles.ActiveHit);
    });

    articleItemRef.current.classList.add(styles.ActiveHit);

    const elementSerialNumber = articleItemRef.current.id.split("-")[2];
    onChangeFocusedSearchItem(Number(elementSerialNumber));
  };

  useEffect(() => {
    if (articleItemRef.current) {
      articleItemRef.current.addEventListener("mouseenter", handleHover);
    }
  }, []);

  return (
    <ParamLink
      className={classNames(styles.HitLink)}
      href={getUrl({ url: props.hit.objectID, docVersion: router.query.version as string ?? "latest", enableVersion })}
    >
      <article
        className={classNames(
          styles.HitContainer,
          props.hit.__position === focusedSearchItem ? styles.ActiveHit : ""
        )}
        id={`list-item-${props.hit.__position}`}
        ref={articleItemRef}
      >
        <p className={styles.HitTitle}>
          <Highlight
            classNames={{
              root: styles.HighlightRoot,
              highlighted: styles.HighlightedText,
            }}
            hit={props.hit}
            attribute="title"
          />
        </p>

        {props.hit._highlightResult &&
          props.hit._highlightResult.content.matchLevel !== "none" && (
            <Snippet
              attribute="content"
              className={styles.SnippetContainer}
              classNames={{
                root: styles.HighlightRoot,
                highlighted: styles.HighlightedText,
              }}
              hit={props.hit}
            />
          )}

        <p className={styles.HitCategory}>{category}</p>
      </article>
    </ParamLink>
  );
}

export default HitComponent;
