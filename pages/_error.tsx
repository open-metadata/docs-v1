import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import Footer from "../components/Footer/Footer";
import { SelectOption } from "../components/SelectDropdown/SelectDropdown";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import SkeletonLoader from "../components/common/SkeletonLoader/SkeletonLoader";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import { tilesInfoArray } from "../constants/404Page.constants";
import { SKELETON_PARAGRAPH_WIDTHS } from "../constants/SkeletonLoader.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { useMenuItemsContext } from "../context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../context/RouteChangingContext";
import { getVersionsList } from "../lib/api";
import { getVersionFromUrl } from "../utils/CommonUtils";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

function ErrorComponent({ versionsList }: Props) {
  const router = useRouter();
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const { menuItems } = useMenuItemsContext();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(true);

  const handleSideNavCollapsed = (value: boolean) => {
    setSideNavCollapsed(value);
  };

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  useEffect(() => {
    const version = getVersionFromUrl(router.asPath);
    if (docVersion !== version) {
      onChangeDocVersion(version);
    }
  }, [router.asPath]);

  return (
    <div className="flex flex-col">
      <TopNav versionsList={versionsList} />
      <CategoriesNav menu={menuItems} />
      <div className="flex">
        <SideNav
          sideNavCollapsed={sideNavCollapsed}
          handleSideNavCollapsed={handleSideNavCollapsed}
        />
        <div
          className={classNames(
            sideNavCollapsed ? "collapsed-content" : "non-collapsed-content"
          )}
        >
          <div className="px-12 py-6">
            {isRouteChanging ? (
              <SkeletonLoader
                paragraph={{
                  rows: SKELETON_PARAGRAPH_WIDTHS.length,
                  width: SKELETON_PARAGRAPH_WIDTHS,
                }}
              />
            ) : (
              <>
                <h2>Page not found :(</h2>
                <TilesContainer>
                  {tilesInfoArray.map((tileInfo) => (
                    <Tile
                      description={tileInfo.description}
                      key={`${tileInfo.link}${tileInfo.title}`}
                      link={tileInfo.link}
                      isExternalLink={tileInfo.isExternalLink}
                      title={tileInfo.title}
                    />
                  ))}
                </TilesContainer>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ErrorComponent;

export async function getServerSideProps() {
  try {
    const versionsList: Array<SelectOption<string>> = getVersionsList();

    return {
      props: { versionsList },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
