import React, { forwardRef, useEffect } from "react";
import { ReactComponent as OverviewIcon } from "../../images/icons/overview-icon.svg";
import styles from "./SideNav.module.css";
import ListItem from "./ListItem";
import classNames from "classnames";
import { ReactComponent as CollapseLeftIcon } from "../../images/icons/collapse-left.svg";
import { ReactComponent as CollapseRightIcon } from "../../images/icons/collapse-right.svg";
import { MenuItem } from "../../interface/common.interface";
import { isEmpty } from "lodash";
import SkeletonLoader from "../common/SkeletonLoader/SkeletonLoader";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";

interface Props {
  category: string;
  items: MenuItem[];
  loading: boolean;
  handleSideNavCollapsed: (value: boolean) => void;
  sideNavCollapsed: boolean;
}

export default forwardRef(function SideNav(
  { sideNavCollapsed, category, items, loading, handleSideNavCollapsed }: Props,
  ref: React.MutableRefObject<boolean>
) {
  const { navBarCollapsed, isMobileDevice } = useNavBarCollapsedContext();
  const toggleSideNavCollapsed = () => {
    handleSideNavCollapsed(!sideNavCollapsed);
  };

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
      {loading ? (
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
            <p className={styles.Heading}>{category}</p>
          </div>
          {isEmpty(items) ? (
            <div className={styles.NoDataPlaceholder}>
              No menu items for this category
            </div>
          ) : (
            <div className={classNames(styles.LinkContainer)}>
              {items.map((item) => (
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
