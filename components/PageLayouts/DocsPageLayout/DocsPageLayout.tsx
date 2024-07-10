import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import classNames from "classnames";
import { has, isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SKELETON_PARAGRAPH_WIDTHS } from "../../../constants/SkeletonLoader.constants";
import { useMenuItemsContext } from "../../../context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../../../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../../../context/RouteChangingContext";
import { components } from "../../../lib/markdoc";
import { checkIsHowToGuidesPaths } from "../../../utils/PathUtils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import CategoriesNav from "../../CategoriesNav/CategoriesNav";
import Footer from "../../Footer/Footer";
import { SelectOption } from "../../SelectDropdown/SelectDropdown";
import SideNav from "../../SideNav/SideNav";
import TopNav from "../../TopNav/TopNav";
import SkeletonLoader from "../../common/SkeletonLoader/SkeletonLoader";

interface DocsPageLayoutProps {
  logo?: ReactNode;
  parsedContent: RenderableTreeNode;
  slug: string[];
  versionsList: SelectOption<string>[];
  footer: ReactNode
}

function DocsPageLayout({
  logo,
  parsedContent,
  slug,
  versionsList,
  footer,
}: Readonly<DocsPageLayoutProps>) {
  const router = useRouter();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(false);
  const { menuItems, isMenuLoading } = useMenuItemsContext();

  // Ref to keep track if the side nav is collapsed before, when "code-preview-container" is in the view.
  const autoCollapsed = useRef(false);

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
        !isEmpty(element) && element.scrollIntoView();
      }, 500);
    }
  }, [autoCollapsed.current]);

  const isHowToGuidesHomePagePath = useMemo(
    () => checkIsHowToGuidesPaths(router),
    [router.asPath]
  );

  useEffect(() => {
    scrollToElementWithOffsetMargin();
  });

  return (
    <div className="flex flex-col">
      <div className="nav-bar-container">
        <TopNav logo={logo} versionsList={versionsList} />
        <CategoriesNav menu={menuItems} />
      </div>
      <div className="flex">
        {!isHowToGuidesHomePagePath && (
          <SideNav
            sideNavCollapsed={sideNavCollapsed}
            handleSideNavCollapsed={handleSideNavCollapsed}
            ref={autoCollapsed}
          />
        )}
        <div
          className={classNames(
            "content",
            sideNavCollapsed ? "collapsed-content" : "non-collapsed-content",
            { "mx-auto": isHowToGuidesHomePagePath }
          )}
        >
          <main
            className={classNames(
              "flex flex-col my-6",
              {
                "mx-12": !isHowToGuidesHomePagePath,
              },
              {
                "px-12": isHowToGuidesHomePagePath,
              }
            )}
          >
            {isRouteChanging || isMenuLoading ? (
              <SkeletonLoader
                showBreadcrumb
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
          {footer}
        </div>
      </div>
    </div>
  );
}

export default DocsPageLayout;
