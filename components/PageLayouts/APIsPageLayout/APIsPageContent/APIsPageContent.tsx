import React from "react";
import styles from "./APIsPageContent.module.css";
import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import { components } from "../../../../lib/markdoc";
import Dropdown from "../../../Dropdown/Dropdown";
import DropdownMenu, { DropdownMenuItem } from "../../../Dropdown/DropdownMenu";
import { API_AND_SDK_MENU_ITEMS } from "../../../../constants/categoriesNav.constants";
import { useRouter } from "next/router";
import { useDocVersionContext } from "../../../../context/DocVersionContext";
import { getUrlWithVersion } from "../../../../utils/CommonUtils";
import Link from "next/link";

interface APIsPageContentProps {
  parsedContent: RenderableTreeNode;
}

function APIsPageContent({ parsedContent }: APIsPageContentProps) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const handleMenuItemClick = (item: DropdownMenuItem) => {
    router.push(getUrlWithVersion(item.value, docVersion));
  };

  return (
    <div className={styles.APIsPageContentContainer}>
      <div className={styles.TopNavContainer}>
        <Dropdown
          alignX="right"
          className={styles.APIRefContainer}
          name="APIs reference"
          popupContent={
            <DropdownMenu
              items={API_AND_SDK_MENU_ITEMS.filter(
                (item) => item.value !== "/api"
              )}
              onItemClick={handleMenuItemClick}
            />
          }
        />
        <Link href="/">Docs</Link>
      </div>
      <div className={styles.Content}>
        {Markdoc.renderers.react(parsedContent, React, {
          components,
        })}
      </div>
    </div>
  );
}

export default APIsPageContent;
