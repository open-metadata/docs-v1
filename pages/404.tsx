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
            <Tile
              description="Deploy OpenMetadata and connect to your sources in minutes!"
              link="/quick-start"
              title="Quickstart"
            />

            <Tile
              description="Enjoy 100% of OpenMetadata with 0% of the hassle."
              link="https://share.hsforms.com/1fstvMCeZRZKTYA4nG1VTPgcq0j9"
              title="SaaS"
            />

            <Tile
              description="Check out some frequent questions and answers"
              link="https://github.com/open-metadata/OpenMetadata/discussions/categories/q-a"
              title="Knowledge Base"
            />

            <Tile
              description="Deploy in Bare Metal, Docker or Kubernetes."
              link="/quick-start"
              title="Deployment"
            />
            <Tile
              description="Connect to database, dashboard, messaging, pipeline and ML services."
              link="/connectors"
              title="Connectors"
            />
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
