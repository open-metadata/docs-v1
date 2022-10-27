import React, { useState } from "react";
import { getArticleSlugFromString, getArticleSlugs, getMenu } from "../lib/api";
import fs from "fs";
import matter from "gray-matter";
import { basename } from "path";
import { useRouter } from "next/router";
import Markdoc, { Schema } from "@markdoc/markdoc";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import classNames from "classnames";
import Footer from "../components/Footer/Footer";
import LayoutSelector from "../components/LayoutSelector/LayoutSelector";
import { components, configs } from "../lib/markdoc";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

export interface MenuItem {
  category: string;
  children: MenuItem[];
  depth: string;
  icon?: string;
  menu_key: string;
  name: string;
  url: string;
}

const homeMenuItem = {
  category: "Home",
  children: [],
  depth: 0,
  menu_key: "home",
  name: "Home",
  url: "/",
};

export default function Article({ menu, data, filename, slug, content }) {
  const router = useRouter();
  const [collapsedNav, setCollapsedNav] = useState(false);
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };

  const ast = Markdoc.parse(content);
  const ParsedContent = Markdoc.transform(ast, configs);

  const item = (menu as MenuItem[]).find(
    (item) => item.url.split("/")[1] === router.asPath.split("/")[1]
  );

  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={collapsedNav}>
        <CategoriesNav menu={[homeMenuItem, ...menu]} />

        <SideNav
          category={item.category.split("/")[0]}
          collapsedNav={collapsedNav}
          items={item.children}
          handleCollapsedNav={handleCollapsedNav}
        />
        <main className={classNames("flex flex-col content")}>
          <Breadcrumb slug={item.url} />
          {Markdoc.renderers.react(ParsedContent, React, {
            components,
          })}
        </main>
        <Footer />
      </LayoutSelector>
    </>
  );
}

export async function getStaticProps(context) {
  const paths = await getStaticPaths();
  const props = {};
  let location = `/${context.params.slug.join("/")}`;

  const menu = getMenu();

  if ("slug" in context.params) {
    let filename = "";

    paths.paths.forEach((obj) => {
      if (obj.params.location == location) {
        filename = obj.params.fileName;
      }
    });

    // Get the last element of the array to find the MD file
    const fileContents = fs.readFileSync(filename, "utf8");
    const { data, content } = matter(fileContents);

    props["menu"] = menu;
    props["data"] = data;
    props["content"] = content;
    props["filename"] = filename;
    props["slug"] = context.params.slug;
  }

  return {
    props: props,
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths = [];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data, content } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        fileName: articles[index],
        title: data.title ? data.title : "Untitled",
        description: data.description ? data.description : "",
      },
    };

    paths.push(path);
  }

  return {
    paths: paths,
    fallback: false,
  };
}
