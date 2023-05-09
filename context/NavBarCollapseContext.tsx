import { has } from "lodash";
import React, { useContext, useEffect, useState } from "react";

export const NavBarCollapseContext = React.createContext({
  navBarCollapsed: false,
  isMobileDevice: false,
  onChangeNavBarCollapsed: (collapsed: boolean) => null,
  onChangeIsMobileDevice: (collapsed: boolean) => null,
});

export const useNavBarCollapsedContext = () =>
  useContext(NavBarCollapseContext);

export const NavBarCollapseContextProvider = ({ children }) => {
  const [navBarCollapsed, setNavBarCollapsed] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const onChangeNavBarCollapsed = (collapsed: boolean) => {
    setNavBarCollapsed(collapsed);
  };
  const onChangeIsMobileDevice = (value: boolean) => {
    setIsMobileDevice(value);
  };

  useEffect(() => {
    if (window && window.screen?.width <= 600) {
      onChangeNavBarCollapsed(true);
      onChangeIsMobileDevice(true);
    }
  }, []);

  return (
    <NavBarCollapseContext.Provider
      value={{
        navBarCollapsed,
        isMobileDevice,
        onChangeNavBarCollapsed,
        onChangeIsMobileDevice,
      }}
    >
      {children}
    </NavBarCollapseContext.Provider>
  );
};
