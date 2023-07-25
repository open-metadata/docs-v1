import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_AND_SDK_MENU_ITEMS } from "../../constants/categoriesNav.constants";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { MenuItem } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import Dropdown from "../Dropdown/Dropdown";
import DropdownMenu from "../Dropdown/DropdownMenu";
import styles from "./CategoriesNav.module.css";

interface Props {
  menu: MenuItem[];
}

export default function CategoriesNav({ menu }: Props) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const { navBarCollapsed } = useNavBarCollapsedContext();
  const category = getCategoryByIndex(router.asPath, 2) ?? "";

  const handleMenuItemClick = (item: {
    label: string;
    value: string;
    category: string;
    withoutVersionPath?: boolean;
  }) => {
    if (item.value.startsWith("/") && !item.withoutVersionPath) {
      router.push(getUrlWithVersion(item.value, docVersion));
    } else {
      window.open(item.value, "_blank").focus();
    }
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
          name="APIs & SDKs"
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
