import Head from "next/head";
import React, { useEffect } from "react";

import "prismjs";
// Import other Prism themes here
import "../public/globals.css";

import type { MarkdocNextJsPageProps } from "@markdoc/next.js";
import { isUndefined } from "lodash";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundary";
import { CodeWithLanguageSelectorContextProvider } from "../context/CodeWithLanguageSelectorContext";
import { DocVersionContextProvider } from "../context/DocVersionContext";
import { MenuItemsContextProvider } from "../context/MenuItemsContext";
import { NavBarCollapseContextProvider } from "../context/NavBarCollapseContext";
import { RouteChangingContextProvider } from "../context/RouteChangingContext";
import { StepsContextProvider } from "../context/StepsContext";
import { fetchVersionsList } from "../utils/CommonUtils";

const TITLE = "OpenMetadata Documentation: Get Help Instantly";
const DESCRIPTION =
  "Follow the step-by-step guides to get started with OpenMetadata, the #1 open source data catalog tool. Get discovery, collaboration, governance, observability, quality tools all in one place.";

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const loadPageFind = async () => {
    if (typeof window?.pageFind === "undefined") {
      const versionsList = await fetchVersionsList();
      try {
        if (isUndefined(window.pageFind)) {
          window.pageFind = {};
        }
        const importPageFindModules = versionsList.map(async ({ value }) => {
          window.pageFind[value] = await import(
            /* webpackIgnore: true */ `/search_indices/${value}/pagefind.js`
          );
          window.pageFind[value].options({
            highlightParam: "highlight",
            excerptLength: 20,
          });
        });

        await Promise.all(importPageFindModules);
      } catch (e) {
        versionsList.forEach(({ value }) => {
          window.pageFind[value] = {
            preload: () => null,
            search: () =>
              Promise.resolve({
                results: [],
              }),
          };
        });
      }
    }
  };

  useEffect(() => {
    loadPageFind();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon180.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="OpenMetadata Docs" property="og:title" />
        <meta content="OpenMetadata Docs" name="twitter:title" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        {DESCRIPTION && (
          <React.Fragment>
            <meta content={DESCRIPTION} name="description" />
            <meta content={DESCRIPTION} property="og:description" />
            <meta content={DESCRIPTION} name="twitter:description" />
          </React.Fragment>
        )}
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <script
          src="https://jiffygpt.com/embed.js"
          id={process.env.NEXT_PUBLIC_GIFFY_GPT_ID}
          defer
        ></script>
      </Head>
      <ErrorBoundary>
        <RouteChangingContextProvider>
          <DocVersionContextProvider>
            <MenuItemsContextProvider>
              <NavBarCollapseContextProvider>
                <StepsContextProvider>
                  <CodeWithLanguageSelectorContextProvider>
                    <Component {...pageProps} />
                  </CodeWithLanguageSelectorContextProvider>
                </StepsContextProvider>
              </NavBarCollapseContextProvider>
            </MenuItemsContextProvider>
          </DocVersionContextProvider>
        </RouteChangingContextProvider>
      </ErrorBoundary>
    </>
  );
}
