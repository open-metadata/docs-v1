import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import { ReactComponent as CollateIcon } from "../../images/icons/ic-collate.svg";
import { getUrl } from "../../utils/CommonUtils";
import { ListItemProps } from "./ListItem.interface";
import styles from "./SideNav.module.css";
import ParamLink from "../ParamLink";

export default function ListItem({
  item,
  fontWeight,
}: Readonly<ListItemProps>) {
  const router = useRouter();
  const { enableVersion } = useDocVersionContext();
  const linkRef = useRef<HTMLAnchorElement>();

  const isDropdown = item.children && item.children.length > 0;
  const isActive = useMemo(() => {
    const urlWithVersion = enableVersion
      ? `/${router.query.version}${item.url}`
      : `${item.url}`;

    // As we introduced ability to add hashes in menu.md,
    // the url in menu.md for hashes include '/' before the '#'
    // (which is necessary to have in menu.md for link separation)
    // so removing the slash below to form the actual url with hash
    return router.asPath.includes(urlWithVersion.replace("/#", "#"));
  }, [router]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  const urlWithVersion = getUrl({ url: item.url, docVersion: router.query.version as string ?? "latest", enableVersion });

  const linkItem = useMemo(() => {
    return (
      <span className=" ml-4 mb-2 flex items-center gap-2">
        <ParamLink
          href={urlWithVersion}
          className={classNames(
            styles.Link,
            Number(item.depth) >= 3 ? styles.TextGray : "",
            isActive ? styles.ActiveLink : ""
          )}
          style={{ fontWeight }}
          name={item.name}
        />

        {item.isCollateOnly && <CollateIcon width={14} height={14} />}
      </span>
    );
  }, [item, router.asPath]);

  useEffect(() => {
    const menuKey = item.url.split("/").reverse()[0];

    // Check if category name is present in pathname
    setIsOpen(router.asPath.includes(menuKey));
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
