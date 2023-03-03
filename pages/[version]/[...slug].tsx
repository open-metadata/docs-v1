import React, { useEffect } from "react";
import {
  getArticleSlugFromString,
  getArticleSlugs,
  getMenu,
} from "../../lib/api";
import fs from "fs";
import matter from "gray-matter";
import { basename } from "path";
import { useRouter } from "next/router";
import Markdoc from "@markdoc/markdoc";
import SideNav from "../../components/SideNav/SideNav";
import TopNav from "../../components/TopNav/TopNav";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import LayoutSelector from "../../components/LayoutSelector/LayoutSelector";
import { components, configs } from "../../lib/markdoc";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { MenuItem, PathObj } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import ErrorBoundary from "../../components/ErrorBoundary";
import { StepsContextProvider } from "../../context/StepsContext";
import { isEmpty, startCase } from "lodash";
import SkeletonLoader from "../../components/common/SkeletonLoader/SkeletonLoader";
import { SKELETON_PARAGRAPH_WIDTHS } from "../../constants/SkeletonLoader.constants";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import { useSideNavCollapseContextContext } from "../../context/SideNavCollapseContext";

interface Props {
  menu: MenuItem[];
  content: string;
  slug: string[];
}

// Offset of 152px = 112px top nav-bar height + 40px top margin to show the link properly
const SCROLLING_OFFSET = 152;

export default function Article({ menu, content, slug }: Props) {
  const router = useRouter();
  const { isRouteChanging } = useRouteChangingContext();
  const { sideNavCollapsed, onChangeSideNavCollapsed } =
    useSideNavCollapseContextContext();

  const category = getCategoryByIndex(router.asPath, 2);

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

  useEffect(() => {
    onChangeSideNavCollapsed(isEmpty(item?.children));
  }, [item]);

  useEffect(() => {
    setTimeout(() => {
      const codePreviewComponent = document.getElementById(
        "code-preview-container"
      );
      if (codePreviewComponent) {
        onChangeSideNavCollapsed(true);
      }
    }, 50);
  }, [router]);

  return (
    <ErrorBoundary>
      <StepsContextProvider>
        <TopNav />
        <LayoutSelector collapsedNav={sideNavCollapsed}>
          <CategoriesNav menu={menu} />

          <SideNav
            category={item ? item.category : startCase(category)}
            items={item ? item.children : []}
            loading={isRouteChanging}
          />
          <main className={classNames("flex flex-col content")}>
            {isRouteChanging ? (
              <SkeletonLoader
                paragraph={{
                  rows: SKELETON_PARAGRAPH_WIDTHS.length,
                  width: SKELETON_PARAGRAPH_WIDTHS,
                }}
              />
            ) : (
              <>
                <Breadcrumb slug={slug} />
                {Markdoc.renderers.react(ParsedContent, React, {
                  components,
                })}
              </>
            )}
          </main>
          <Footer />
        </LayoutSelector>
      </StepsContextProvider>
    </ErrorBoundary>
  );
}

export async function getServerSideProps(context) {
  const paths = await getPaths();
  const props = { menu: [], content: "", slug: [] };

  // Check if the version field passed in context params is proper version format
  const versionFormat = /(v\d\.*\d*)/g;
  const isVersionPresent = versionFormat.test(context.params.version);

  if (isVersionPresent) {
    let location = `/${context.params.version}/${context.params.slug.join(
      "/"
    )}`;

    const menu = getMenu(context.params.version);

    if ("slug" in context.params) {
      let filename = "";
      let notFound = true;

      for (const obj of paths) {
        if (`/${obj.params.version}${obj.params.location}` === location) {
          filename = obj.params.fileName;
          notFound = false;
          break;
        }
      }

      if (notFound) {
        return { notFound };
      }

      // Get the last element of the array to find the MD file
      const fileContents = fs.readFileSync(filename, "utf8");
      const { content } = matter(fileContents);

      props["menu"] = menu;
      props["content"] = content;
      props["slug"] = context.params.slug;
    }
  }

  return { props };
}

async function getPaths() {
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

    const slugsArray = articles[index].split("/");

    const versionIndex =
      slugsArray.findIndex((slugString) => slugString === "content") + 1;

    const version = slugsArray[versionIndex];

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        version: version,
        fileName: articles[index],
        title: data.title ? (data.title as string) : "Untitled",
        description: data.description ? (data.description as string) : "",
      },
    };

    paths.push(path);
  }

  return paths;
}
