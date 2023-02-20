import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export const RouteChangingContext = React.createContext({
  isRouteChanging: false,
  onRouteChange: (isChanging: boolean) => null,
});

export const useRouteChangingContext = () => useContext(RouteChangingContext);

export const RouteChangingContextProvider = ({ children }) => {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState<boolean>(false);

  const onRouteChange = (isChanging: boolean) => {
    setIsRouteChanging(isChanging);
  };

  useEffect(() => {
    const onStart = () => {
      onRouteChange(true);
    };
    const onEnd = () => {
      onRouteChange(false);
    };
    Router.events.on("routeChangeStart", onStart);
    Router.events.on("routeChangeComplete", onEnd);
    Router.events.on("routeChangeError", onEnd);
    return () => {
      Router.events.off("routeChangeStart", onStart);
      Router.events.off("routeChangeComplete", onEnd);
      Router.events.off("routeChangeError", onEnd);
    };
  }, [router]);

  return (
    <RouteChangingContext.Provider value={{ isRouteChanging, onRouteChange }}>
      {children}
    </RouteChangingContext.Provider>
  );
};
