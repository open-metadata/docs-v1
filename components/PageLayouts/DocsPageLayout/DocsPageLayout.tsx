import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TopNav from "../../TopNav/TopNav";
import CategoriesNav from "../../CategoriesNav/CategoriesNav";
import SideNav from "../../SideNav/SideNav";
import classNames from "classnames";
import SkeletonLoader from "../../common/SkeletonLoader/SkeletonLoader";
import { SKELETON_PARAGRAPH_WIDTHS } from "../../../constants/SkeletonLoader.constants";
import Footer from "../../Footer/Footer";
import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import { has, isEmpty, startCase } from "lodash";
import { SelectOption } from "../../SelectDropdown/SelectDropdown";
import { useRouter } from "next/router";
import { getCategoryByIndex } from "../../../lib/utils";
import { MenuItem } from "../../../interface/common.interface";
import { useRouteChangingContext } from "../../../context/RouteChangingContext";
import { useNavBarCollapsedContext } from "../../../context/NavBarCollapseContext";
import { components } from "../../../lib/markdoc";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";

interface DocsPageLayoutProps {
  parsedContent: RenderableTreeNode;
  menu: MenuItem[];
  slug: string[];
  versionsList: SelectOption<string>[];
}

function DocsPageLayout({
  parsedContent,
  menu,
  slug,
  versionsList,
}: DocsPageLayoutProps) {
  const router = useRouter();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(false);

  // Ref to keep track if the side nav is collapsed before, when "code-preview-container" is in the view.
  const autoCollapsed = useRef(false);
  const category = useMemo(
    () => getCategoryByIndex(router.asPath, 2),
    [router.asPath]
  );

  const item = useMemo(
    () => menu.find((item) => getCategoryByIndex(item.url, 1) === category),
    [menu, category]
  );

  const handleSideNavCollapsed = useCallback(
    (value: boolean) => {
      setSideNavCollapsed(value);
    },
    [setSideNavCollapsed]
  );
  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  // Function to scroll element into view with some offset margin
  // For scrolling to the hash element on page after load
  const scrollToElementWithOffsetMargin = useCallback(() => {
    if (
      has(window, "location.hash") &&
      !isEmpty(window.location.hash) &&
      !autoCollapsed.current // To prevent scrolling after each time the side panel collapses
    ) {
      const hashElementId = window.location.hash.slice(1);
      const element = document.getElementById(hashElementId);

      setTimeout(() => {
        element &&
          element.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
      }, 500);
    }
  }, [autoCollapsed.current]);

  useEffect(() => {
    scrollToElementWithOffsetMargin();
  });

  return (
    <div className="flex flex-col">
      <div className="nav-bar-container">
        <TopNav versionsList={versionsList} />
        <CategoriesNav menu={menu} />
      </div>
      <div className="flex">
        <SideNav
          sideNavCollapsed={sideNavCollapsed}
          category={item ? item.category : startCase(category)}
          items={item ? item.children : []}
          loading={isRouteChanging}
          handleSideNavCollapsed={handleSideNavCollapsed}
          ref={autoCollapsed}
        />
        <div
          className={classNames(
            "content",
            sideNavCollapsed ? "collapsed-content" : "non-collapsed-content"
          )}
        >
          <main className={classNames("flex flex-col mx-12 my-6")}>
            {isRouteChanging ? (
              <SkeletonLoader
                paragraph={{
                  rows: SKELETON_PARAGRAPH_WIDTHS.length,
                  width: SKELETON_PARAGRAPH_WIDTHS,
                }}
              />
            ) : (
              <>
                <Breadcrumb slug={slug} />
                {Markdoc.renderers.react(parsedContent, React, {
                  components,
                })}
              </>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DocsPageLayout;
