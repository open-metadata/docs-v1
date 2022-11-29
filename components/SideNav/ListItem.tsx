import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import { checkDropdownStatus } from "../../lib/utils";
import { MenuItem } from "../../interface/common.interface";
import styles from "./SideNav.module.css";

export default function ListItem({
  item,
  fontWeight,
}: {
  item: MenuItem;
  fontWeight?: number;
}) {
  const router = useRouter();
  const isDropdown = item.children && item.children.length > 0;
  const isActive = item.url === router.asPath;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  const linkItem = useMemo(
    () => (
      <>
        <Link href={item.url}>
          <a
            className={classNames(
              styles.Link,
              Number(item.depth) >= 3 ? styles.TextGray : "",
              isActive ? styles.ActiveLink : ""
            )}
            href={item.url}
            style={{
              fontWeight: `${6 - Math.min(Number(item.depth), 4)}00`,
            }}
          >
            {item.name}
          </a>
        </Link>
      </>
    ),
    [item]
  );

  useEffect(() => {
    // Check if category name is present in pathname
    setIsOpen(
      checkDropdownStatus(router.asPath, item.url.split("/").reverse()[0])
    );
  }, [router.asPath, item]);

  return (
    <>
      {isDropdown ? (
        <span className={classNames(styles.ListItem)}>
          <span
            className={isOpen ? styles.ArrowDown : styles.ArrowRight}
            onClick={() => toggleOpen()}
          >
            {isOpen ? <ArrowDown /> : <ArrowRight />}
          </span>
          {linkItem}
        </span>
      ) : (
        linkItem
      )}
      {isDropdown && isOpen && (
        <div className={classNames(styles.LinkContainer)}>
          {item.children.map((childItem) => (
            <ListItem item={childItem} key={childItem.name} />
          ))}
        </div>
      )}
    </>
  );
}
