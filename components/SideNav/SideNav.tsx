import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { ReactComponent as OverviewIcon } from "../../images/icons/overview-icon.svg";
import styles from "./SideNav.module.css";
import { getMenuItems } from "./SideNav.constants";
import ListItem from "./ListItem";
import classNames from "classnames";

export default function SideNav() {
  const router = useRouter();
  const category = router.pathname.split("/")[1];

  const items = useMemo(() => getMenuItems(category), [router]);

  return (
    <nav className={`${styles.SideNav} left-nav`}>
      <div className="flex items-center gap-3 px-4 mb-3">
        <OverviewIcon />
        <p className="text-sm my-0">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </div>
      <div className={classNames(styles.LinkContainer)}>
        {items && items.map((item) => <ListItem item={item} />)}
      </div>
    </nav>
  );
}
