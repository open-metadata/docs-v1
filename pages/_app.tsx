import Head from 'next/head';

import 'prismjs';
// Import other Prism themes here
import '../public/globals.css';
import '../public/modal.css';

import { isEmpty } from 'lodash';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary';
import GoogleAnalyticsScript from '../components/GoogleAnalyticsScript/GoogleAnalyticsScript';
import { CodeWithLanguageSelectorContextProvider } from '../context/CodeWithLanguageSelectorContext';
import { DocVersionContextProvider } from '../context/DocVersionContext';
import { MenuItemsContextProvider } from '../context/MenuItemsContext';
import { NavBarCollapseContextProvider } from '../context/NavBarCollapseContext';
import { RouteChangingContextProvider } from '../context/RouteChangingContext';
import { StepsContextProvider } from '../context/StepsContext';
import { SlugProps } from './[version]/[...slug]';

const TITLE = 'OpenMetadata Documentation: Get Help Instantly';
const DESCRIPTION =
  'Follow the step-by-step guides to get started with OpenMetadata, the #1 open source data catalog tool. Get discovery, collaboration, governance, observability, quality tools all in one place.';

export default function MyApp({ Component, pageProps }: AppProps<SlugProps>) {
  const title = isEmpty(pageProps.pageTitle) ? TITLE : pageProps.pageTitle;
  const description = isEmpty(pageProps.pageDescription)
    ? DESCRIPTION
    : pageProps.pageDescription;

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
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <GoogleAnalyticsScript />
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
