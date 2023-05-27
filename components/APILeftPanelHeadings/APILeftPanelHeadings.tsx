import React from "react";
import APILeftPanelItem from "./APILeftPanelItem";
import { HeadingObject } from "../PageLayouts/APIsPageLayout/APIsPageSideNav/APIsPageSideNav";

interface APILeftPanelHeadingsProps {
  headingObjects: HeadingObject[];
}

function APILeftPanelHeadings({ headingObjects }: APILeftPanelHeadingsProps) {
  return (
    <>
      {headingObjects.map((headingObject) => (
        <APILeftPanelItem
          headingObject={headingObject}
          key={`${headingObject.label}-${headingObject.level}`}
        />
      ))}
    </>
  );
}

export default APILeftPanelHeadings;
