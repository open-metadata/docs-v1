import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import { ReactComponent as CollateIcon } from "../../images/icons/ic-collate.svg";
import { MenuItem } from "../../interface/common.interface";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import styles from "./SideNav.module.css";

export default function ListItem({
  item,
  fontWeight,
}: {
  item: MenuItem;
  fontWeight?: number;
}) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const linkRef = useRef<HTMLAnchorElement>();

  const isDropdown = item.children && item.children.length > 0;
  const isActive = router.asPath.includes(
    `/${router.query.version}${item.url}`
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  const urlWithVersion = getUrlWithVersion(item.url, docVersion);

  const linkItem = useMemo(() => {
    return (
      <span className=" ml-4 mb-2 flex items-center gap-2">
        <Link legacyBehavior href={urlWithVersion}>
          <a
            className={classNames(
              styles.Link,
              Number(item.depth) >= 3 ? styles.TextGray : "",
              isActive ? styles.ActiveLink : ""
            )}
            ref={linkRef}
            style={{
              fontWeight,
            }}
          >
            {item.name}
          </a>
        </Link>
        {item.isCollateOnly && <CollateIcon width={14} height={14} />}
      </span>
    );
  }, [item, router.asPath]);

  useEffect(() => {
    const menuKey = item.url.split("/").reverse()[0];

    // Check if category name is present in pathname
    setIsOpen(router.asPath.includes(menuKey));
  }, [router.asPath, item]);

  useEffect(() => {
    // Logic to get the selected side nav item into view after page load
    if (linkRef.current && linkRef.current.className.includes("ActiveLink")) {
      linkRef.current.scrollIntoView({ block: "center", inline: "center" });
    }
  }, [isActive, linkRef]);

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
