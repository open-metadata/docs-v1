import Head from "next/head";

import "prismjs";
// Import other Prism themes here
import "../public/globals.css";
import "../public/modal.css";

import { isEmpty } from "lodash";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundary";
import { CodeWithLanguageSelectorContextProvider } from "../context/CodeWithLanguageSelectorContext";
import { DocVersionContextProvider } from "../context/DocVersionContext";
import { MenuItemsContextProvider } from "../context/MenuItemsContext";
import { NavBarCollapseContextProvider } from "../context/NavBarCollapseContext";
import { RouteChangingContextProvider } from "../context/RouteChangingContext";
import { StepsContextProvider } from "../context/StepsContext";
import { SlugProps } from "./[version]/[...slug]";
import { useEffect, useState } from "react";
import CookieModal from "../components/CookieModal/CookieModal";
import { useRouter } from "next/router";
import { HOST_NAME } from "../constants/common.constants";

declare global {
  interface Window {
      dataLayer: Record<string, any>[];
  }
}

const TITLE = "OpenMetadata Documentation: Get Help Instantly";
const DESCRIPTION =
  "Follow the step-by-step guides to get started with OpenMetadata, the #1 open source data catalog tool. Get discovery, collaboration, governance, observability, quality tools all in one place.";

export default function MyApp({ Component, pageProps }: AppProps<SlugProps>) {
  const router = useRouter();
  const { noindex, nofollow, pageTitle, pageDescription, slug } = pageProps;
  const title = isEmpty(pageTitle) ? TITLE : pageTitle;
  const description = isEmpty(pageDescription)
    ? DESCRIPTION
    : pageDescription;

  const canonicalUrl = `${HOST_NAME}/${router.query.version}/${slug?.join('/') || ''}`;

  const [storedCookie, setStoredCookie] = useState<string | null>(null);

  const handleButtonClick = (choice: string) => {
    localStorage.setItem("docsOmCookie", choice);
    setStoredCookie(choice); 
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userCookie = window.localStorage.getItem("docsOmCookie");
      setStoredCookie(userCookie);
    }
  }, []);

  useEffect(() => {
    if (!storedCookie || storedCookie === 'Accept') {
        // Google Tag Manager
        const gtmTagScript = document.createElement('script')
        gtmTagScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-554C968W');
        `
        gtmTagScript.id = 'gtm-init'
        document.head.appendChild(gtmTagScript)
    } else {
        window.dataLayer = []

        const scriptTags = document.querySelectorAll(
            'script[src*="googletagmanager"], script#gtm-init'
        )
        scriptTags.forEach((tag) => tag.remove())
    }
}, [storedCookie])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon180.png" />
        {(noindex || nofollow) ? (
          <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
        ) : (
          <link rel="canonical" href={canonicalUrl} />
        )}
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <ErrorBoundary>
        <RouteChangingContextProvider>
          <DocVersionContextProvider>
            <MenuItemsContextProvider>
              <NavBarCollapseContextProvider>
                <StepsContextProvider>
                  <CodeWithLanguageSelectorContextProvider>
                  {!storedCookie && (
                        <CookieModal handleButtonClick={handleButtonClick} />
                      )}
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
