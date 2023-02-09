import { isEmpty, startCase } from "lodash";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import SkeletonLoader from "../components/common/SkeletonLoader/SkeletonLoader";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import Footer from "../components/Footer/Footer";
import LayoutSelector from "../components/LayoutSelector/LayoutSelector";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import { tilesInfoArray } from "../constants/404Page.constants";
import { SKELETON_PARAGRAPH_WIDTHS } from "../constants/SkeletonLoader.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { MenuItem } from "../interface/common.interface";
import { getCategoryByIndex } from "../lib/utils";
import { fetchMenuList, getVersionFromUrl } from "../utils/CommonUtils";

function Error() {
  const router = useRouter();
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const [collapsedNav, setCollapsedNav] = useState(true);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };

  const category = getCategoryByIndex(router.asPath, 2);

  const fetchMenuItems = async (docVersion: string) => {
    const res = await fetchMenuList(docVersion);
    setMenu(res);
  };

  useEffect(() => {
    fetchMenuItems(docVersion);
  }, [docVersion]);

  useEffect(() => {
    const version = getVersionFromUrl(router.asPath);
    if (docVersion !== version) {
      onChangeDocVersion(version);
    }
    const onStart = () => {
      setLoading(true);
      setCollapsedNav(false);
    };
    const onEnd = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", onStart);
    Router.events.on("routeChangeComplete", onEnd);
    Router.events.on("routeChangeError", onEnd);
    return () => {
      Router.events.off("routeChangeStart", onStart);
      Router.events.off("routeChangeComplete", onEnd);
      Router.events.off("routeChangeError", onEnd);
    };
  }, [router]);

  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={collapsedNav}>
        <CategoriesNav menu={menu} />
        <SideNav
          category={startCase(category)}
          collapsedNav={collapsedNav}
          items={[]}
          loading={loading}
          handleCollapsedNav={handleCollapsedNav}
        />
        <div className="content page-404 ">
          {loading ? (
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
      </LayoutSelector>
    </>
  );
}

export default Error;
