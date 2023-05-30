import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MenuItem } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import styles from "./CategoriesNav.module.css";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import Dropdown from "../Dropdown/Dropdown";
import DropdownMenu, { DropdownMenuItem } from "../Dropdown/DropdownMenu";
import { API_AND_SDK_MENU_ITEMS } from "../../constants/categoriesNav.constants";

interface Props {
  menu: MenuItem[];
}

export default function CategoriesNav({ menu }: Props) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const { navBarCollapsed } = useNavBarCollapsedContext();
  const category = getCategoryByIndex(router.asPath, 2) ?? "";

  const handleMenuItemClick = (item: DropdownMenuItem) => {
    router.push(getUrlWithVersion(item.value, docVersion));
  };

  return (
    <div
      className={classNames(
        styles.Container,
        navBarCollapsed ? styles.CollapsedNav : ""
      )}
    >
      <div className={styles.CategoriesContainer}>
        {menu.map((item) => {
          const active = category === getCategoryByIndex(item.url, 1);
          return (
            <Link
              href={getUrlWithVersion(item.url, docVersion)}
              key={item.url}
              className={classNames(
                styles.NavItem,
                active ? styles.Active : ""
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className={styles.ExtraContent}>
        <Dropdown
          alignX="right"
          className={styles.APIContainer}
          name="SDKs"
          popupContent={
            <DropdownMenu
              items={API_AND_SDK_MENU_ITEMS}
              onItemClick={handleMenuItemClick}
            />
          }
        />
      </div>
    </div>
  );
}
