import Markdoc from "@markdoc/markdoc";
import { isEqual, isObject, isUndefined } from "lodash";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Script from "next/script";
import React, { useMemo } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Footer from "../../components/Footer/Footer";
import GoogleAnalyticsScript from "../../components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import APIPageLayout from "../../components/PageLayouts/APIPageLayout/APIPageLayout";
import DocsPageLayout from "../../components/PageLayouts/DocsPageLayout/DocsPageLayout";
import { SelectOption } from "../../components/SelectDropdown/SelectDropdown";
import TopNav from "../../components/TopNav/TopNav";
import { API_AND_SDK_MENU_ITEMS } from "../../constants/categoriesNav.constants";
import {
  DEFAULT_VERSION,
  REGEX_VERSION_MATCH,
} from "../../constants/version.constants";
import { getVersionsList } from "../../lib/api";
import { configs } from "../../lib/markdoc";
import { getFormattedPartials } from "../../utils/CommonUtils";
import {
  getPaths,
  getReturnObjectForValidVersion,
} from "../../utils/SlugUtils";

export interface SlugProps {
  content: string;
  slug: string[];
  versionsList: Array<SelectOption<string>>;
  partials: Record<string, string>;
  pageTitle: string;
  pageDescription: string;
}

export default function Article({
  content,
  slug,
  versionsList,
  partials,
  pageTitle,
  pageDescription,
}: Readonly<SlugProps>) {
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
      <Head>
        <title>{pageTitle}</title>
        <meta content={pageTitle} name="twitter:title" />
        {pageDescription && (
          <React.Fragment>
            <meta content={pageDescription} name="description" />
            <meta content={pageDescription} property="og:description" />
            <meta content={pageDescription} name="twitter:description" />
          </React.Fragment>
        )}
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
      </Head>

      <ErrorBoundary>
        {isAPIsPage.value ? (
          <APIPageLayout
            parsedContent={parsedContent}
            pageInfoObject={isAPIsPage.pageInfoObject}
          />
        ) : (
          <DocsPageLayout
            navbar={<TopNav versionsList={versionsList} />}
            parsedContent={parsedContent}
            slug={slug}
            footer={<Footer />}
          />
        )}
      </ErrorBoundary>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SlugProps>> {
  try {
    const version = context.params.version as string;
    const slug = context.params.slug as string[];
    const pathWithoutVersion = slug.join("/");

    // If the version in the URL is the default version, change the path to /latest
    if (version === DEFAULT_VERSION) {
      return {
        redirect: {
          permanent: false,
          destination: `/latest/${pathWithoutVersion}`,
        },
      };
    }

    // Get all paths for the docs
    const paths = await getPaths();

    // Default props
    const props: SlugProps = {
      content: "",
      slug: [],
      versionsList: [],
      partials: {},
      pageTitle: "",
      pageDescription: "",
    };

    // Check if the version field passed in context params is proper version format
    const isVersionValid = REGEX_VERSION_MATCH.test(version);

    const versionsList: Array<SelectOption<string>> = getVersionsList();

    // Handle the case when the version is valid
    if (isVersionValid) {
      const returnObj = getReturnObjectForValidVersion({
        context,
        paths,
        versionsList,
      });

      if (!isUndefined(returnObj)) {
        return returnObj;
      }
    }

    return { props };
  } catch {
    return {
      notFound: true,
    };
  }
}
