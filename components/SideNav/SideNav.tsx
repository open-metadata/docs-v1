import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactComponent as QuckStart } from "../../images/icons/Quickstart.svg";
import styles from "./SideNav.module.css";

const items = [
  {
    title: "Quckstart",
    href: "/docs/quick-start",
    type: "category",
    icon: <QuckStart />,
    children: [
      {
        title: "Try OpenMetadata in Docker",
        href: "/docs/quick-start/local-deployment",
      },
      {
        title: "Try OpenMetadata in Sandbox",
        href: "/docs/quick-start/sandbox",
      },
    ],
  },
];

interface NavItemType {
  title: string;
  href: string;
  type?: string;
  icon?: ReactNode;
  children: NavItemType[];
}

export function SideNav() {
  const router = useRouter();

  const getNavBar = (items: NavItemType[]) => {
    return (
      <div className={styles.LinkContainer}>
        {items.map((item) => {
          const active = router.pathname === item.href;
          return (
            <div key={item.href}>
              <div
                className={
                  item.type === "category"
                    ? styles.Category
                    : `${styles.NavLink} ${active ? styles.Active : ""}`
                }
              >
                {item.icon}
                <Link title={item.title} href={item.href}>
                  <a href={item.href}>{item.title}</a>
                </Link>
              </div>
              {item.children &&
                item.children.length > 0 &&
                getNavBar(item.children)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav className={`${styles.SideNav} left-nav`}>
      {getNavBar(items as NavItemType[])}
    </nav>
  );
}
