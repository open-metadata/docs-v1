import React from "react";
import { APIElementInViewContextProvider } from "../../../context/APIElementInViewContext";
import APIsPageSideNav from "./APIsPageSideNav/APIsPageSideNav";
import APIsPageContent from "./APIsPageContent/APIsPageContent";
import { RenderableTreeNode } from "@markdoc/markdoc";

interface APIsPageLoyoutProps {
  parsedContent: RenderableTreeNode;
  pageInfoObject: {
    label: string;
    value: string;
  };
}

function APIsPageLayout({ parsedContent, pageInfoObject }: APIsPageLoyoutProps) {
  return (
    <APIElementInViewContextProvider>
      <div className="api-page-container">
        <APIsPageSideNav pageInfoObject={pageInfoObject} />
        <APIsPageContent parsedContent={parsedContent} pageInfoObject={pageInfoObject} />
      </div>
    </APIElementInViewContextProvider>
  );
}

export default APIsPageLayout;
