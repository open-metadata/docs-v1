import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./TableOfContents.module.css";
import classNames from "classnames";

interface TocItem {
  id: string;
  level: number;
  title: string;
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length <= 1) {
    return null;
  }

  return (
    <nav className={`${styles.Container} right-nav`}>
      <div className={styles.ContentHeading}>Content</div>
      <ul className={styles.ContentList}>
        {toc.map((item) => {
          const href = `#${item.id}`;
          const active =
            typeof window !== "undefined" && window.location.hash === href;

          return (
            <li
              key={item.title}
              className={classNames(
                styles[`Level${item.level}`],
                styles.ListItem
              )}
            >
              <Link href={href} passHref>
                <a className={styles.ContentLink}>{item.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
