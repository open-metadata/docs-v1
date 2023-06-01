import React from "react";
import Head from "next/head";

import "prismjs";
// Import other Prism themes here
import "../public/globals.css";

import type { AppProps } from "next/app";
import type { MarkdocNextJsPageProps } from "@markdoc/next.js";
import { useRouter } from "next/router";
import ErrorBoundary from "../components/ErrorBoundary";
import { DocVersionContextProvider } from "../context/DocVersionContext";
import { RouteChangingContextProvider } from "../context/RouteChangingContext";
import { NavBarCollapseContextProvider } from "../context/NavBarCollapseContext";
import { StepsContextProvider } from "../context/StepsContext";

const TITLE = "OpenMetadata Documentation: Get Help Instantly";
const DESCRIPTION =
  "Follow the step-by-step guides to get started with OpenMetadata, the #1 open source data catalog tool. Get discovery, collaboration, governance, observability, quality tools all in one place.";

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const router = useRouter();

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
      </Head>
      <ErrorBoundary>
        <RouteChangingContextProvider>
          <DocVersionContextProvider>
            <NavBarCollapseContextProvider>
              <StepsContextProvider>
                <Component {...pageProps} key={router.asPath} />
              </StepsContextProvider>
            </NavBarCollapseContextProvider>
          </DocVersionContextProvider>
        </RouteChangingContextProvider>
      </ErrorBoundary>
    </>
  );
}
