import classNames from "classnames";
import { useRouter } from "next/router";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { MenuItem } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import { getUrl, getUrlWithVersion } from "../../utils/CommonUtils";
import styles from "./CategoriesNav.module.css";
import ParamLink from "../ParamLink";

interface Props {
  menu: MenuItem[];
}

export default function CategoriesNav({ menu }: Props) {
  const router = useRouter();
  const { enableVersion } = useDocVersionContext();
  const { navBarCollapsed } = useNavBarCollapsedContext();
  const category =
    getCategoryByIndex(router.asPath.split('?')[0], enableVersion ? 2 : 1) ?? "";

  const handleMenuItemClick = (item: {
    label: string;
    value: string;
    category: string;
    withoutVersionPath?: boolean;
  }) => {
    if (item.value.startsWith("/") && !item.withoutVersionPath) {
      router.push(getUrlWithVersion(item.value, router.query.version as string));
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
            <ParamLink
              href={getUrl({ url: item.url, docVersion: router.query.version as string ?? "latest", enableVersion })}
              key={item.url}
              className={classNames(
                styles.NavItem,
                active ? styles.Active : ""
              )}
              name={item.name}
            />
          );
        })}
      </div>

      {/* TODO: uncomment once the API page contents are added */}
      {/* <div className={styles.ExtraContent}>
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
      </div> */}
    </div>
  );
}
