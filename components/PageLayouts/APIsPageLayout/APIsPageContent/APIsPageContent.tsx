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
  pageInfoObject: {
    label: string;
    value: string;
  };
}

function APIsPageContent({
  parsedContent,
  pageInfoObject,
}: APIsPageContentProps) {
  const router = useRouter();
  const { docVersion } = useDocVersionContext();
  const handleMenuItemClick = (item: DropdownMenuItem) => {
    if (item.value.startsWith("/")) {
      router.push(getUrlWithVersion(item.value, docVersion));
    } else {
      window.open(item.value, "_blank").focus();
    }
  };

  return (
    <div className={styles.APIsPageContentContainer}>
      <div className={styles.TopNavContainer}>
        <Dropdown
          alignX="right"
          className={styles.APIRefContainer}
          name="APIs & SDKs"
          popupContent={
            <DropdownMenu
              items={API_AND_SDK_MENU_ITEMS.filter(
                (item) => item.value !== pageInfoObject.value
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
