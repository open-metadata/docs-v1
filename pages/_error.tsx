import { isEmpty, startCase } from "lodash";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import Footer from "../components/Footer/Footer";
import LayoutSelector from "../components/LayoutSelector/LayoutSelector";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import { tilesInfoArray } from "../constants/404Page.constants";
import { DEFAULT_VERSION } from "../constants/version.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { MenuItem } from "../interface/common.interface";
import { getCategoryByIndex } from "../lib/utils";
import { getUrlWithVersion, getVersionFromUrl } from "../utils/CommonUtils";

function Error({ version }) {
  const router = useRouter();
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const [collapsedNav, setCollapsedNav] = useState(true);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };

  const category = getCategoryByIndex(router.asPath, 2);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`/api/getMenu?version=${version}`, {
        method: "GET",
      });

      const parsedResponse = await response.json();

      if (response.status === 200) {
        setMenu(parsedResponse);
      } else {
        setMenu([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const version = getVersionFromUrl(router.asPath);
    if (docVersion !== version) {
      onChangeDocVersion(version);
    }
  }, [router]);

  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={collapsedNav}>
        {!isEmpty(menu) && <CategoriesNav menu={menu} />}
        <SideNav
          category={startCase(category)}
          collapsedNav={collapsedNav}
          items={[]}
          handleCollapsedNav={handleCollapsedNav}
        />
        <div className="content page-404 ">
          <h2>Page not found :(</h2>
          <TilesContainer>
            {tilesInfoArray.map((tileInfo) => (
              <Tile
                description={tileInfo.description}
                key={`${tileInfo.link}${tileInfo.title}`}
                link={
                  tileInfo.isDocsLink
                    ? getUrlWithVersion(tileInfo.link)
                    : tileInfo.link
                }
                title={tileInfo.title}
              />
            ))}
          </TilesContainer>
        </div>
        <Footer />
      </LayoutSelector>
    </>
  );
}

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // The version in the context is reset after page is changed to error page.
  // Below is the logic to get the version from url if already present in the request object
  const version = getVersionFromUrl(res?.req ? res.req.url : "");

  return {
    version,
    statusCode,
  };
};

export default Error;
