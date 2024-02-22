import classNames from "classnames";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useMemo } from "react";
import { useMenuItemsContext } from "../../context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { ReactComponent as CollapseLeftIcon } from "../../images/icons/collapse-left.svg";
import { ReactComponent as CollapseRightIcon } from "../../images/icons/collapse-right.svg";
import { ReactComponent as OverviewIcon } from "../../images/icons/overview-icon.svg";
import { getCategoryByIndex } from "../../lib/utils";
import { getSideNavItems } from "../../utils/SideNavUtils";
import SkeletonLoader from "../common/SkeletonLoader/SkeletonLoader";
import ListItem from "./ListItem";
import styles from "./SideNav.module.css";

export const componentKey = "manual";

interface Props {
  handleSideNavCollapsed: (value: boolean) => void;
  sideNavCollapsed: boolean;
}

export default forwardRef(function SideNav(
  { sideNavCollapsed, handleSideNavCollapsed }: Props,
  ref: React.MutableRefObject<boolean>
) {
  const router = useRouter();
  const { navBarCollapsed, isMobileDevice } = useNavBarCollapsedContext();
  const toggleSideNavCollapsed = () => {
    handleSideNavCollapsed(!sideNavCollapsed);
  };
  const { menuItems, isMenuLoading } = useMenuItemsContext();

  const category = useMemo(
    () => getCategoryByIndex(router.asPath, 2),
    [router.asPath]
  );

  const item = useMemo(
    () =>
      menuItems.find((item) => getCategoryByIndex(item.url, 1) === category),
    [menuItems, category]
  );

  const childItems = useMemo(
    () => getSideNavItems(item, router.asPath),
    [item, router.asPath]
  );

  useEffect(() => {
    const scrollEventListener = () => {
      // check if the SideNav was already collapsed before.
      if (ref && !ref.current) {
        const codePreviewComponent = document.getElementById(
          "code-preview-container"
        );
        if (codePreviewComponent && window && window.innerWidth <= 1440) {
          const position = codePreviewComponent.getBoundingClientRect();

          if (position?.top < window.innerHeight - 100) {
            ref.current = true;
            // Setting timeout to avoid stopping the auto scroll for the hash element
            setTimeout(() => {
              handleSideNavCollapsed(true);
            }, 200);
          }
        }
      }
    };

    document.addEventListener("scroll", scrollEventListener);

    return () => document.removeEventListener("scroll", scrollEventListener);
  }, []);

  useEffect(() => {
    if (window && window.screen?.width <= 600) {
      handleSideNavCollapsed(true);
    }
  }, []);

  return (
    <div
      className={classNames(
        styles.SideNav,
        sideNavCollapsed ? styles.CollapsedSideNav : styles.NonCollapsedSideNav
      )}
      id="side-nav-container"
      style={
        isMobileDevice
          ? {
              // setting the top position to stick side nav bar to based on the top nav bar height
              // based on collapsed or non-collapsed top bar
              top: navBarCollapsed ? "86px" : "253px",
            }
          : {}
      }
    >
      {isMenuLoading ? (
        <SkeletonLoader
          className="w-full"
          title={false}
          paragraph={{ rows: 6, width: SkeletonWidth.DEFAULT }}
        />
      ) : (
        <div
          className={
            sideNavCollapsed
              ? styles.CollapsedSideNavContent
              : styles.NonCollapsedSideNavContent
          }
        >
          <div className="flex items-center gap-2 px-1 mb-3">
            <OverviewIcon />
            <p className={styles.Heading}>{item?.category ?? category}</p>
          </div>
          {isEmpty(childItems) ? (
            <div className={styles.NoDataPlaceholder}>
              No menu items for this category
            </div>
          ) : (
            <div className={classNames(styles.LinkContainer)}>
              {childItems.map((item) => (
                <ListItem
                  item={item}
                  key={item.name}
                  fontWeight={item.depth === "1" ? 500 : 400}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <span className={styles.IconContainer}>
        {sideNavCollapsed ? (
          <span title="Expand Menu">
            <CollapseRightIcon
              className={styles.CollapseIcon}
              onClick={toggleSideNavCollapsed}
            />
          </span>
        ) : (
          <span title="Collapse Menu">
            <CollapseLeftIcon
              className={styles.CollapseIcon}
              onClick={toggleSideNavCollapsed}
            />
          </span>
        )}
      </span>
    </div>
  );
});
