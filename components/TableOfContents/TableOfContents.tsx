import React from "react";
import Link from "next/link";
import styles from "./TableOfContents.module.css";

export function TableOfContents({ toc }) {
  console.log(toc);
  const items = toc.filter(
    (item) => item.id && (item.level === 2 || item.level === 3)
  );

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className={`${styles.Container} right-nav`}>
      <h3 className={styles.ContentHeading}>Content</h3>
      <ul className={styles.ContentList}>
        {items.map((item) => {
          const href = `#${item.id}`;
          const active =
            typeof window !== "undefined" && window.location.hash === href;
          return (
            <li
              key={item.title}
              className={[
                active ? "active" : undefined,
                item.level === 3 ? "padded" : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
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
