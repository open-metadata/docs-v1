import Markdoc from "@markdoc/markdoc";
import fs from "fs";
import matter from "gray-matter";
import { isEmpty, isEqual, isObject } from "lodash";
import Script from "next/script";
import { basename } from "path";
import { useMemo } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import GoogleAnalyticsScript from "../../components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import APIPageLayout from "../../components/PageLayouts/APIPageLayout/APIPageLayout";
import DocsPageLayout from "../../components/PageLayouts/DocsPageLayout/DocsPageLayout";
import { SelectOption } from "../../components/SelectDropdown/SelectDropdown";
import { API_AND_SDK_MENU_ITEMS } from "../../constants/categoriesNav.constants";
import { PathObj } from "../../interface/common.interface";
import {
  getArticleSlugFromString,
  getArticleSlugs,
  getPartialsConfigObject,
  getVersionsList,
} from "../../lib/api";
import { configs } from "../../lib/markdoc";
import { getFormattedPartials } from "../../utils/CommonUtils";

interface Props {
  content: string;
  slug: string[];
  versionsList: Array<SelectOption<string>>;
  partials: Record<string, string>;
  metaData: Record<string, string>;
}

export default function Article({
  content,
  slug,
  versionsList,
  partials,
  metaData,
}: Readonly<Props>) {
  const ast = useMemo(() => Markdoc.parse(content), [content]);

  const formattedPartialsObj = useMemo(
    () => getFormattedPartials(partials),
    [partials]
  );

  const parsedContent = useMemo(
    () =>
      Markdoc.transform(ast, {
        ...configs,
        partials: formattedPartialsObj,
      }),
    [ast, configs, formattedPartialsObj]
  );

  const isAPIsPage = useMemo(() => {
    const matchedObject = API_AND_SDK_MENU_ITEMS.find((item) => {
      const slugFromItemPath = item.value.split("/");
      // Removing first element which will be empty
      slugFromItemPath.shift();

      return isEqual(slug, slugFromItemPath);
    });

    return isObject(matchedObject)
      ? { value: true, pageInfoObject: matchedObject }
      : { value: false, pageInfoObject: { label: "", value: "" } };
  }, [slug]);

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
      <GoogleAnalyticsScript />
      <ErrorBoundary>
        <div
          className="hidden"
          data-pagefind-sort="weight[data-weight]"
          data-pagefind-meta="title"
          data-weight={metaData.weight ?? "0"}
          id="article-title-metadata"
        >
          {metaData.title}
        </div>
        {isAPIsPage.value ? (
          <APIPageLayout
            parsedContent={parsedContent}
            pageInfoObject={isAPIsPage.pageInfoObject}
          />
        ) : (
          <DocsPageLayout
            parsedContent={parsedContent}
            slug={slug}
            versionsList={versionsList}
          />
        )}
      </ErrorBoundary>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const paths = await getPaths();
    const props: Props = {
      content: "",
      slug: [],
      versionsList: [],
      partials: {},
      metaData: {
        title: "",
      },
    };

    // Check if the version field passed in context params is proper version format
    const versionFormat = /v\d+\.\d+\.x/;
    const isVersionPresent = versionFormat.test(context.params.version);

    const versionsList: Array<SelectOption<string>> = getVersionsList();

    if (isVersionPresent) {
      let location = `/${context.params.version}/${context.params.slug.join(
        "/"
      )}`;

      const partials = getPartialsConfigObject();

      if ("slug" in context.params) {
        let filename = "";
        let notFound = true;

        for (const obj of paths.paths) {
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
        const { data, content } = matter(fileContents);

        props["content"] = content;
        props["slug"] = context.params.slug;
        props["versionsList"] = versionsList;
        props["partials"] = partials;
        props["metaData"] = data;
      }
    }

    return { props };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  // Avoid page generation for dev server.
  if (process.env.NODE_ENV === "development") {
    return {
      paths: [], // Indicates that no page needs be created at build time
      fallback: "blocking", // Indicates the type of fallback
    };
  }

  return await getPaths();
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
    if (isEmpty(fileContents)) {
      continue;
    }
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

  return {
    paths,
    fallback: false,
  };
}
