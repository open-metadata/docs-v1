import React, { ReactNode, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactComponent as OverviewIcon } from "../../images/icons/overview-icon.svg";
import { ReactComponent as ArrowDown } from "../../images/icons/drop-arrow-down.svg";
import { ReactComponent as ArrowRight } from "../../images/icons/drop-arrow-right.svg";
import styles from "./SideNav.module.css";
import { getMenuItems } from "./SideNav.constants";
import classNames from "classnames";

interface NavItemType {
  name: string;
  href: string;
  children?: NavItemType[];
}

export default function SideNav() {
  const router = useRouter();
  const category = router.pathname.split("/")[1];

  const items = useMemo(() => getMenuItems(category), [router]);

  useEffect(() => {
    const toggler = document.getElementsByClassName("caret");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  });

  const getNavBar = (items: NavItemType[], id?: string) => {
    return (
      <ul
        id={id}
        className={classNames(styles.LinkContainer, id ? "" : "nested")}
      >
        {items &&
          items.map((item) => {
            const isDropdown = item.children && item.children.length;
            const isActive = item.href === router.pathname;
            return (
              <>
                <li className={styles.ListItem} key={item.href}>
                  {isDropdown ? (
                    <span className={classNames("caret", styles.ListItem)}>
                      <ArrowDown className="DownArrow" />
                      <ArrowRight className="RightArrow" />
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
                  {isDropdown && getNavBar(item.children)}
                </li>
              </>
            );
          })}
      </ul>
    );
  };

  return (
    <nav className={`${styles.SideNav} left-nav`}>
      <div className="flex items-center gap-4 px-4">
        <OverviewIcon />
        <p className="text-md">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </div>
      {getNavBar(items as NavItemType[], "myUL")}
    </nav>
  );
}
