import React, { useContext, useState } from "react";

export const SideNavCollapseContext = React.createContext({
  sideNavCollapsed: false,
  onChangeSideNavCollapsed: (value: boolean) => null,
});

export const useSideNavCollapseContextContext = () =>
  useContext(SideNavCollapseContext);

export const SideNavCollapseContextProvider = ({ children }) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(false);

  const onChangeSideNavCollapsed = (value: boolean) => {
    setSideNavCollapsed(value);
  };

  return (
    <SideNavCollapseContext.Provider
      value={{ sideNavCollapsed, onChangeSideNavCollapsed }}
    >
      {children}
    </SideNavCollapseContext.Provider>
  );
};
