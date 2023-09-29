import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import classNames from "classnames";
import { has, isEmpty, startCase } from "lodash";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SKELETON_PARAGRAPH_WIDTHS } from "../../../constants/SkeletonLoader.constants";
import { useNavBarCollapsedContext } from "../../../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../../../context/RouteChangingContext";
import { MenuItem } from "../../../interface/common.interface";
import { components } from "../../../lib/markdoc";
import { getCategoryByIndex } from "../../../lib/utils";
import { checkIsHowToGuidesPaths } from "../../../utils/PathUtils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import CategoriesNav from "../../CategoriesNav/CategoriesNav";
import Footer from "../../Footer/Footer";
import HowToGuidesHeader from "../../HowToGuidesHeader/HowToGuidesHeader";
import { SelectOption } from "../../SelectDropdown/SelectDropdown";
import SideNav from "../../SideNav/SideNav";
import TopNav from "../../TopNav/TopNav";
import SkeletonLoader from "../../common/SkeletonLoader/SkeletonLoader";

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
        !isEmpty(element) &&
          element.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
      }, 500);
    }
  }, [autoCollapsed.current]);

  const isHowToGuidesHomePagePath = useMemo(
    () => checkIsHowToGuidesPaths(router),
    []
  );

  useEffect(() => {
    scrollToElementWithOffsetMargin();
  });

  return (
    <div className="flex flex-col">
      <div className="nav-bar-container">
        <TopNav versionsList={versionsList} />
        <CategoriesNav menu={menu} />
      </div>
      {isHowToGuidesHomePagePath && <HowToGuidesHeader />}
      <div className="flex">
        {!isHowToGuidesHomePagePath && (
          <SideNav
            sideNavCollapsed={sideNavCollapsed}
            category={item ? item.category : startCase(category)}
            items={item ? item.children : []}
            loading={isRouteChanging}
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
