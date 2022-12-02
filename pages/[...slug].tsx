import React, { useEffect, useState } from "react";
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
import { MenuItem, PathObj } from "../interface/common.interface";
import { getCategoryByIndex } from "../lib/utils";
import ErrorBoundary from "../components/ErrorBoundary";
import { StepsContextProvider } from "../context/StepsContext";

interface Props {
  menu: MenuItem[];
  content: string;
}

// Offset of 152px = 112px top nav-bar height + 40px top margin to show the link properly
const SCROLLING_OFFSET = 152;

export default function Article({ menu, content }: Props) {
  const router = useRouter();
  const [collapsedNav, setCollapsedNav] = useState(false);
  const handleCollapsedNav = (value: boolean) => {
    setCollapsedNav(value);
  };
  const category = getCategoryByIndex(router.asPath, 1);

  const ast = Markdoc.parse(content);
  const ParsedContent = Markdoc.transform(ast, configs);

  const item = (menu as MenuItem[]).find(
    (item) => getCategoryByIndex(item.url, 1) === category
  );

  // Function to scroll element into view with some offset margin
  // For scrolling to the hash element on page after load
  const scrollToElementWithOffsetMargin = () => {
    const hashElementId = window.location.hash.slice(1);
    const element = document.getElementById(hashElementId);
    const elementPosition = element?.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - SCROLLING_OFFSET;

    setTimeout(
      () =>
        window.scrollTo({
          top: offsetPosition,
          behavior: "auto",
        }),
      0
    );
  };

  useEffect(() => {
    scrollToElementWithOffsetMargin();
  }, []);

  return (
    <ErrorBoundary>
      <StepsContextProvider>
        <TopNav />
        <LayoutSelector collapsedNav={collapsedNav}>
          <CategoriesNav menu={menu} />

          <SideNav
            category={item ? getCategoryByIndex(item.category, 0) : category}
            collapsedNav={collapsedNav}
            items={item ? item.children : []}
            handleCollapsedNav={handleCollapsedNav}
          />
          <main className={classNames("flex flex-col content")}>
            <Breadcrumb slug={item ? item.url : ""} />
            {Markdoc.renderers.react(ParsedContent, React, {
              components,
            })}
          </main>
          <Footer />
        </LayoutSelector>
      </StepsContextProvider>
    </ErrorBoundary>
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
    const { content } = matter(fileContents);

    props["menu"] = menu;
    props["content"] = content;
  }

  return {
    props: props,
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths: PathObj[] = [];

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
        title: data.title ? (data.title as string) : "Untitled",
        description: data.description ? (data.description as string) : "",
      },
    };

    paths.push(path);
  }

  return {
    paths: paths,
    fallback: false,
  };
}
