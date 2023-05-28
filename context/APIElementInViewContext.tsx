import React, { useCallback, useContext, useEffect, useState } from "react";

export const APIElementInViewContext = React.createContext({
  apiElementInView: "",
  onChangeApiElementInView: (value: string) => null,
});

export const useAPIElementInViewContext = () =>
  useContext(APIElementInViewContext);

export const APIElementInViewContextProvider = ({ children }) => {
  const [apiElementInView, setApiElementInView] = useState("");

  const onChangeApiElementInView = (value: string) => {
    setApiElementInView(value);
  };

  // A callback function that will be called when the links enter/leave the screen.
  const callback = useCallback(
    (headings: IntersectionObserverEntry[]) => {
      const [headingElementInView] = headings;
      if (headingElementInView.isIntersecting) {
        const elementId = headingElementInView.target.getAttribute("id");
        setApiElementInView(elementId);
        window.location.hash = elementId;
      }
    },
    [setApiElementInView]
  );

  useEffect(() => {
    // Get all links inside the headers.
    const headingLinks = Array.from(
      document.querySelectorAll(
        [
          "h1 a:first-of-type",
          "h2 a:first-of-type",
          "h3 a:first-of-type",
          "h4 a:first-of-type",
          "h5 a:first-of-type",
          "h6 a:first-of-type",
        ].join(",")
      )
    );

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: "0px 0px -90% 0px",
    });

    headingLinks.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <APIElementInViewContext.Provider
      value={{ apiElementInView, onChangeApiElementInView }}
    >
      {children}
    </APIElementInViewContext.Provider>
  );
};
