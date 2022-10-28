import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MenuItem } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import styles from "./CategoriesNav.module.css";

interface Props {
  menu: MenuItem[];
}

export default function CategoriesNav({ menu }: Props) {
  const router = useRouter();
  const category = getCategoryByIndex(router.asPath, 1);
  return (
    <div className={classNames("main-nav", styles.Container)}>
      {menu.map((item) => {
        const active = category === getCategoryByIndex(item.url, 1);
        return (
          <Link href={item.url} key={item.url}>
            <a
              className={classNames(
                styles.NavItem,
                active ? styles.Active : ""
              )}
              href={item.url}
            >
              {item.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
