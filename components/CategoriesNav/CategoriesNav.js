import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./CategoriesNav.module.css";

const menu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Quickstart",
    href: "/quick-start",
  },
  {
    title: "Overview",
    href: "/overview",
  },
  {
    title: "Deployment",
    href: "/deployment",
  },
  {
    title: "Connectors",
    href: "/connectors",
  },
  {
    title: "Open Metadata",
    href: "/open-metadata",
  },
];

export default function CategoriesNav() {
  const router = useRouter();
  const category = router.pathname.split("/")[1];
  return (
    <div className={classNames("main-nav", styles.Container)}>
      {menu.map((item) => {
        const active = category === item.href.split("/")[1];
        return (
          <Link href={item.href} key={item.href}>
            <a
              className={classNames(
                styles.NavItem,
                active ? styles.Active : ""
              )}
              href={item.href}
            >
              {item.title}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
