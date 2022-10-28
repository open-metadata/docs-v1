import React from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import LayoutSelector from "../components/LayoutSelector/LayoutSelector";
import TopNav from "../components/TopNav/TopNav";
import { getMenu } from "../lib/api";

export default function Home({ menu }) {
  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={true}>
        <CategoriesNav menu={menu} />
        <div className="content page-404 ">404 : Page Not Found</div>
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
