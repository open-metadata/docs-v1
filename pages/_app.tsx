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

const TITLE = "OpenMetadata Documentation";
const DESCRIPTION =
  "A documentation for 'OpenMetadata', an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration";

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon32.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="OpenMetadata Docs" property="og:title" />
        <meta content="OpenMetadata Docs" name="twitter:title" />
        {DESCRIPTION && (
          <React.Fragment>
            <meta content={DESCRIPTION} name="description" />
            <meta content={DESCRIPTION} property="og:description" />
            <meta content={DESCRIPTION} name="twitter:description" />
          </React.Fragment>
        )}
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ErrorBoundary>
        <RouteChangingContextProvider>
          <DocVersionContextProvider>
            <Component {...pageProps} key={router.asPath} />
          </DocVersionContextProvider>
        </RouteChangingContextProvider>
      </ErrorBoundary>
    </>
  );
}
