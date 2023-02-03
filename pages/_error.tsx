import { startCase } from "lodash";
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
import { getUrlWithVersion } from "../utils/CommonUtils";

function Error({ menu }: { menu: MenuItem[] }) {
  const router = useRouter();
  const [collapsedNav, setCollapsedNav] = useState(true);
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };

  const category = getCategoryByIndex(router.asPath, 2);

  useEffect(() => {
    const versionString = router.asPath.match(/(\/v(\d*\.*)*\/)/g)[0];
    const version = versionString.split("/")[1];
    if (docVersion !== version) {
      onChangeDocVersion(version);
    }
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
  const domainString = res?.req
    ? res.req.rawHeaders.find((element) => element.includes("http"))
    : undefined;
  const domain = domainString ? domainString : "/";

  const versionStringArray = res.req
    ? res.req.url.match(/(\/v(\d*\.*)*\/)/g)
    : undefined;
  const versionString = versionStringArray ? versionStringArray[0] : undefined;
  const version = versionString ? versionString.split("/")[1] : DEFAULT_VERSION;
  let menu;

  try {
    const response = await fetch(`${domain}api/getMenu?version=${version}`, {
      method: "GET",
    });

    menu = await response.json();
  } catch {
    menu = [];
  }

  return {
    menu,
    statusCode,
  };
};

export default Error;
