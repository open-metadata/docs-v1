import Head from "next/head";

import "prismjs";
// Import other Prism themes here
import "../public/globals.css";
import "../public/modal.css";

import type { MarkdocNextJsPageProps } from "@markdoc/next.js";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundary";
import { RunLLMWidgetScript } from "../components/RunLLMWidgetScript/RunLLMWidgetScript";
import { CodeWithLanguageSelectorContextProvider } from "../context/CodeWithLanguageSelectorContext";
import { DocVersionContextProvider } from "../context/DocVersionContext";
import { MenuItemsContextProvider } from "../context/MenuItemsContext";
import { NavBarCollapseContextProvider } from "../context/NavBarCollapseContext";
import { RouteChangingContextProvider } from "../context/RouteChangingContext";
import { StepsContextProvider } from "../context/StepsContext";

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon180.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <RunLLMWidgetScript />
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
