import React from "react";
import { ReactComponent as OverviewIcon } from "../icons/overview-icon.svg";
import styles from "./SideNav.module.css";
import ListItem from "./ListItem";
import classNames from "classnames";
import { ReactComponent as CollapseLeftIcon } from "../icons/collapse-left.svg";
import { ReactComponent as CollapseRightIcon } from "../icons/collapse-right.svg";
import { MenuItem } from "../../interface/common.interface";
import { isEmpty } from "lodash";
import SkeletonLoader from "../common/SkeletonLoader/SkeletonLoader";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { useSideNavCollapseContextContext } from "../../context/SideNavCollapseContext";

interface Props {
  category: string;
  items: MenuItem[];
  loading: boolean;
}

export default function SideNav({ category, items, loading }: Props) {
  const { sideNavCollapsed, onChangeSideNavCollapsed } =
    useSideNavCollapseContextContext();

  const toggleCollapse = () => {
    onChangeSideNavCollapsed(!sideNavCollapsed);
  };

  return (
    <nav
      className={`${classNames(
        styles.SideNav,
        sideNavCollapsed ? styles.CollapsedSideNav : styles.NonCollapsedSideNav
      )} left-nav`}
    >
      {loading ? (
        <SkeletonLoader
          className="w-full"
          title={false}
          paragraph={{ rows: 6, width: SkeletonWidth.DEFAULT }}
        />
      ) : (
        <div
          style={{
            display: sideNavCollapsed ? "none" : "block",
          }}
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
              onClick={toggleCollapse}
            />
          </span>
        ) : (
          <span title="Collapse Menu">
            <CollapseLeftIcon
              className={styles.CollapseIcon}
              onClick={toggleCollapse}
            />
          </span>
        )}
      </span>
    </nav>
  );
}
