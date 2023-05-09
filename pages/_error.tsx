import { startCase } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import SkeletonLoader from "../components/common/SkeletonLoader/SkeletonLoader";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import Footer from "../components/Footer/Footer";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import { tilesInfoArray } from "../constants/404Page.constants";
import { SKELETON_PARAGRAPH_WIDTHS } from "../constants/SkeletonLoader.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { useRouteChangingContext } from "../context/RouteChangingContext";
import { MenuItem } from "../interface/common.interface";
import { getCategoryByIndex } from "../lib/utils";
import { fetchMenuList, getVersionFromUrl } from "../utils/CommonUtils";
import { SelectOption } from "../components/SelectDropdown/SelectDropdown";
import { getVersionsList } from "../lib/api";
import { useNavBarCollapsedContext } from "../context/NavBarCollapseContext";
import classNames from "classnames";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

function ErrorComponent({ versionsList }: Props) {
  const router = useRouter();
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(true);

  const handleSideNavCollapsed = (value: boolean) => {
    setSideNavCollapsed(value);
  };

  const category = getCategoryByIndex(router.asPath, 2);

  const fetchMenuItems = async (docVersion: string) => {
    const res = await fetchMenuList(docVersion);
    setMenu(res);
  };

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  useEffect(() => {
    fetchMenuItems(docVersion);
  }, [docVersion]);

  useEffect(() => {
    const version = getVersionFromUrl(router.asPath);
    if (docVersion !== version) {
      onChangeDocVersion(version);
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <TopNav versionsList={versionsList} />
      <CategoriesNav menu={menu} />
      <div className="flex">
        <SideNav
          category={startCase(category)}
          items={[]}
          sideNavCollapsed={sideNavCollapsed}
          handleSideNavCollapsed={handleSideNavCollapsed}
          loading={isRouteChanging}
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
