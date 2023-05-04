import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MenuItem } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import styles from "./CategoriesNav.module.css";
import { useDocVersionContext } from "../../context/DocVersionContext";

interface Props {
  menu: MenuItem[];
}

export default function CategoriesNav({ menu }: Props) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const category = getCategoryByIndex(router.asPath, 2) ?? "";

  return (
    <div className={classNames(styles.Container)}>
      {menu.map((item) => {
        const active = category === getCategoryByIndex(item.url, 1);
        return (
          <Link
            href={getUrlWithVersion(item.url, docVersion)}
            key={item.url}
            className={classNames(styles.NavItem, active ? styles.Active : "")}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
