import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import { checkDropdownStatus } from "../../lib/utils";
import { MenuItem } from "../../pages/[...slug]";
import styles from "./SideNav.module.css";

export default function ListItem({ item }: { item: MenuItem }) {
  const router = useRouter();
  const isDropdown = item.children && item.children.length > 0;
  const isActive = item.url === router.asPath;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    // Check if category name is present in pathname
    setIsOpen(
      checkDropdownStatus(router.asPath, item.url.split("/").reverse()[0])
    );
  }, [router.asPath, item]);

  return (
    <div className={styles.ListItem} key={item.url}>
      <>
        {isDropdown ? (
          <span className={classNames("caret", styles.ListItem)}>
            <span onClick={() => toggleOpen()}>
              {isOpen ? <ArrowDown /> : <ArrowRight />}
            </span>
            <Link href={item.url}>
              <a
                className={classNames(
                  styles.Link,
                  isActive ? styles.ActiveLink : ""
                )}
                href={item.url}
              >
                {item.name}
              </a>
            </Link>
          </span>
        ) : (
          <Link href={item.url}>
            <a
              className={classNames(
                styles.Link,
                isActive ? styles.ActiveLink : ""
              )}
              href={item.url}
            >
              {item.name}
            </a>
          </Link>
        )}
        <div className={classNames(styles.LinkContainer)}>
          {isDropdown &&
            isOpen &&
            item.children.map((item) => (
              <ListItem item={item} key={item.name} />
            ))}
        </div>
      </>
    </div>
  );
}
