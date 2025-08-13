import { RenderableTreeNode } from "@markdoc/markdoc";
import { APIElementInViewContextProvider } from "../../../context/APIElementInViewContext";
import APIPageContent from "./APIPageContent/APIPageContent";
import APIPageSideNav from "./APIPageSideNav/APIPageSideNav";

interface APIsPageLoyoutProps {
  parsedContent: RenderableTreeNode;
  pageInfoObject: {
    label: string;
    value: string;
  };
}

function APIsPageLayout({
  parsedContent,
  pageInfoObject,
}: APIsPageLoyoutProps) {
  return (
    <APIElementInViewContextProvider>
      <div className="api-page-container">
        <APIPageSideNav pageInfoObject={pageInfoObject} />
        <APIPageContent
          parsedContent={parsedContent}
          pageInfoObject={pageInfoObject}
        />
      </div>
    </APIElementInViewContextProvider>
  );
}

export default APIsPageLayout;
