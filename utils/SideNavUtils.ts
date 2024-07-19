import { HOW_TO_GUIDES_MENU_ITEM_KEY } from "../constants/SideNav.constants";
import { MenuItem } from "../interface/common.interface";
import { getCategoryByIndex } from "../lib/utils";

export const getSideNavItems = (item: MenuItem, path, enableVersion?: boolean) => {
  if (item?.menu_key === HOW_TO_GUIDES_MENU_ITEM_KEY) {
    const subCategory = getCategoryByIndex(path, enableVersion ? 3 : 2);
    return (
      item?.children.filter((child) => child.menu_key === subCategory) ?? []
    );
  }

  return item?.children ?? [];
};
