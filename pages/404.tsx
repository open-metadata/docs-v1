import { startCase } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import Footer from "../components/Footer/Footer";
import LayoutSelector from "../components/LayoutSelector/LayoutSelector";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import { tilesInfoArray } from "../constants/404Page.constants";
import { getMenu } from "../lib/api";
import { getCategoryByIndex } from "../lib/utils";

export default function Home({ menu }) {
  const router = useRouter();
  const [collapsedNav, setCollapsedNav] = useState(true);
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };
  const category = getCategoryByIndex(router.asPath, 1);

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
                link={tileInfo.link}
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

export async function getStaticProps() {
  return {
    props: {
      menu: getMenu(),
    },
    revalidate: 60,
  };
}
