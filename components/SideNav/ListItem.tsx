import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import styles from "./SideNav.module.css";

interface NavItemType {
  name: string;
  href: string;
  children?: NavItemType[];
}

export default function ListItem({ item }: { item: NavItemType }) {
  const router = useRouter();
  const isDropdown = item.children && item.children.length;
  const isActive = item.href === router.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    // Check if category name is present in pathname
    setIsOpen(
      router.pathname
        .split("/")
        .slice(0, -1)
        .indexOf(item.name.toLowerCase()) !== -1
    );
  }, [router.pathname]);

  return (
    <div className={styles.ListItem} key={item.href}>
      <>
        {isDropdown ? (
          <span className={classNames("caret", styles.ListItem)}>
            <span onClick={() => toggleOpen()}>
              {isOpen ? <ArrowDown /> : <ArrowRight />}
            </span>
            <Link href={item.href}>
              <a
                className={classNames(
                  styles.Link,
                  isActive ? styles.ActiveLink : ""
                )}
                href={item.href}
              >
                {item.name}
              </a>
            </Link>
          </span>
        ) : (
          <Link href={item.href}>
            <a
              className={classNames(
                styles.Link,
                isActive ? styles.ActiveLink : ""
              )}
              href={item.href}
            >
              {item.name}
            </a>
          </Link>
        )}
        <div className={classNames(styles.LinkContainer)}>
          {isDropdown &&
            isOpen &&
            item.children.map((item) => <ListItem item={item} />)}
        </div>
      </>
    </div>
  );
}
