import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MenuItem } from "../interface/common.interface";
import { fetchMenuList } from "../utils/CommonUtils";
import { useDocVersionContext } from "./DocVersionContext";

export const MenuItemsContext = React.createContext({
  menuItems: [] as Array<MenuItem>,
  isMenuLoading: false,
});

export const useMenuItemsContext = () => useContext(MenuItemsContext);

export const MenuItemsContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);
  const [isMenuLoading, setIsMenuLoading] = useState<boolean>(false);
  const { docVersion } = useDocVersionContext();

  const getMenuItems = useCallback(async () => {
    try {
      setIsMenuLoading(true);
      const menuArray = await fetchMenuList(docVersion);
      setMenuItems(menuArray);
    } finally {
      setIsMenuLoading(false);
    }
  }, [docVersion]);

  useEffect(() => {
    getMenuItems();
  }, [docVersion]);

  const contextValue = useMemo(
    () => ({ menuItems, isMenuLoading }),
    [menuItems, isMenuLoading]
  );

  return (
    <MenuItemsContext.Provider value={contextValue}>
      {children}
    </MenuItemsContext.Provider>
  );
};
