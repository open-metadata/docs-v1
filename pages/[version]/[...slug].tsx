import React, { useEffect, useRef, useState } from "react";
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
import { components, configs } from "../../lib/markdoc";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { MenuItem, PathObj } from "../../interface/common.interface";
import { getCategoryByIndex } from "../../lib/utils";
import ErrorBoundary from "../../components/ErrorBoundary";
import { StepsContextProvider } from "../../context/StepsContext";
import { has, isEmpty, startCase } from "lodash";
import SkeletonLoader from "../../components/common/SkeletonLoader/SkeletonLoader";
import { SKELETON_PARAGRAPH_WIDTHS } from "../../constants/SkeletonLoader.constants";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import Script from "next/script";

interface Props {
  menu: MenuItem[];
  content: string;
  slug: string[];
}

// Offset of 152px = 112px top nav-bar height + 140px top margin to show the link properly
const SCROLLING_OFFSET = 252;

export default function Article({ menu, content, slug }: Props) {
  const router = useRouter();
  const { isRouteChanging } = useRouteChangingContext();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(false);

  // Ref to keep track if the side nav is collapsed before, when "code-preview-container" is in the view.
  const autoCollapsed = useRef(false);

  const handleSetSideNavCollapsed = (value: boolean) => {
    setSideNavCollapsed(value);
  };

  const category = getCategoryByIndex(router.asPath, 2);

  const ast = Markdoc.parse(content);
  const ParsedContent = Markdoc.transform(ast, configs);

  const item = (menu as MenuItem[]).find(
    (item) => getCategoryByIndex(item.url, 1) === category
  );

  // Function to scroll element into view with some offset margin
  // For scrolling to the hash element on page after load
  const scrollToElementWithOffsetMargin = () => {
    if (
      has(window, "location.hash") &&
      !isEmpty(window.location.hash) &&
      !autoCollapsed.current // To prevent scrolling after each time the side panel collapses
    ) {
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
    }
  };

  useEffect(() => {
    scrollToElementWithOffsetMargin();
  });

  return (
    <>
      <Script
        id="show-banner"
        dangerouslySetInnerHTML={{
          __html: `              
                (function(window, document, dataLayerName, id) {
                  window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
                  function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
                  var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
                  var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
                  tags.async=!0,tags.src="https://collate.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
                  !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
                  })(window, document, 'dataLayer', '85b94982-8c42-497f-96c9-353365f1fe7a');
                `,
        }}
      />
      <ErrorBoundary>
        <StepsContextProvider>
          <div className="flex flex-col">
            <TopNav />
            <CategoriesNav menu={menu} />
            <div className="flex">
              <SideNav
                sideNavCollapsed={sideNavCollapsed}
                category={item ? item.category : startCase(category)}
                items={item ? item.children : []}
                loading={isRouteChanging}
                handleSetSideNavCollapsed={handleSetSideNavCollapsed}
                ref={autoCollapsed}
              />
              <div
                className={classNames(
                  "content",
                  sideNavCollapsed
                    ? "collapsed-content"
                    : "non-collapsed-content"
                )}
              >
                <main className={classNames("flex flex-col mx-12 my-6")}>
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
              </div>
            </div>
          </div>
        </StepsContextProvider>
      </ErrorBoundary>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const paths = await getPaths();
    const props = { menu: [], content: "", slug: [] };

    // Check if the version field passed in context params is proper version format
    const versionFormat = /v(\d+\.\d+\.\d+)/g;
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
  } catch {
    return {
      notFound: true,
    };
  }
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
    const { data } = matter(fileContents);

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
