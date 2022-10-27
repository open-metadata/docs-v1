import React from "react";
import { ReactComponent as OverviewIcon } from "../../images/icons/overview-icon.svg";
import styles from "./SideNav.module.css";
import ListItem from "./ListItem";
import classNames from "classnames";
import { ReactComponent as CollapseLeftIcon } from "../../images/icons/collapse-left.svg";
import { ReactComponent as CollapseRightIcon } from "../../images/icons/collapse-right.svg";

interface Props {
  category: string;
  collapsedNav: boolean;
  items: any;
  handleCollapsedNav: (value: boolean) => void;
}

export default function SideNav({
  category,
  collapsedNav,
  items,
  handleCollapsedNav,
}: Props) {
  const toggleCollapse = () => {
    handleCollapsedNav(!collapsedNav);
  };

  return (
    <nav
      className={`${classNames(
        styles.SideNav,
        collapsedNav ? styles.CollapsedSideNav : styles.NonCollapsedSideNav
      )} left-nav`}
    >
      <div
        style={{
          display: collapsedNav ? "none" : "block",
        }}
      >
        <div className="flex items-center gap-3 px-4 mb-3">
          <OverviewIcon />
          <p className="text-sm my-0">{category}</p>
        </div>
        <div className={classNames(styles.LinkContainer)}>
          {items &&
            items.map((item) => <ListItem item={item} key={item.name} />)}
        </div>
      </div>
      {collapsedNav ? (
        <CollapseRightIcon
          className={styles.CollapseIcon}
          onClick={toggleCollapse}
        />
      ) : (
        <CollapseLeftIcon
          className={styles.CollapseIcon}
          onClick={toggleCollapse}
        />
      )}
    </nav>
  );
}
